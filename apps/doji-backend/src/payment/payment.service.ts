import { User } from '@backend/entities/User'
import { environment } from '@backend/environments/environment'
import {
  CoinTransactionError,
  CoinTransactionService,
} from '@backend/payment/coin-transaction.service'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import {
  BadRequestException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common'
import axios from 'axios'
import Omise from 'omise'

@Injectable()
export class PaymentService {
  private readonly omise: Omise.IOmise = Omise(environment.omise)
  private readonly logger = new Logger('PaymentService')

  constructor(
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    private readonly coinTransactionService: CoinTransactionService,
  ) {}

  private async setCardAsDefault(user: User, cardToken: string): Promise<void> {
    await axios({
      method: 'PATCH',
      url: `https://api.omise.co/customers/${user.omiseCustomerToken}s`,
      data: `default_card=${cardToken}`,
      auth: {
        username: environment.omise.secretKey,
        password: '',
      },
    })
  }

  private async createCustomer(user: User, cardToken?: string): Promise<User> {
    const customer = await this.omise.customers.create({
      email: user.email,
      description: user.username,
      card: cardToken,
    })

    user.omiseCustomerToken = customer.id

    await this.userRepo.persistAndFlush(user)
    return user
  }

  async attachCreditCard(user: User, cardToken: string, isDefault?: boolean): Promise<User> {
    if (!user.omiseCustomerToken) {
      return this.createCustomer(user, cardToken)
    }

    const customer = await this.omise.customers.update(user.omiseCustomerToken, {
      card: cardToken,
    })

    if (isDefault) {
      const cards = customer.cards.data
      try {
        await this.setCardAsDefault(user, cards[cards.length - 1].id)
      } catch (error) {
        this.logger.error(error)
        throw new BadRequestException('Cannot set card as default')
      }
    }

    return user
  }

  async retrieveCreditCards(user: User): Promise<Omise.Cards.ICard[]> {
    if (!user.omiseCustomerToken) {
      await this.createCustomer(user)
    }

    return (await this.omise.customers.listCards(user.omiseCustomerToken)).data
  }

  async deposit(user: User, amount: number, card: string) {
    const userCards = await this.retrieveCreditCards(user)
    if (!userCards.find((c) => c.id === card)) {
      this.logger.error(`user ${user.username} attempted ${card} card but doesn not have that card`)
      throw new UnprocessableEntityException('User does not have the card')
    }

    if (amount < 20) {
      throw new UnprocessableEntityException('Minimum amount is 20THB')
    }

    const charge = await this.omise.charges.create({
      amount: amount,
      currency: 'thb',
      customer: user.omiseCustomerToken,
      card: card,
      capture: true,
    })

    if (!charge.paid) {
      this.logger.error(`Charge capture failed on ${charge.id}`)
      throw new UnprocessableEntityException(`Failed to capture charge`)
    }

    await this.coinTransactionService.depositUserAccount(user, charge.amount, charge.id)
  }

  async withdraw(user: User, amount: number, destinationAccount: string) {
    try {
      await this.coinTransactionService.withdrawUserAccount(user, amount, destinationAccount)
    } catch (e) {
      if (e instanceof CoinTransactionError) {
        throw new UnprocessableEntityException(e.message)
      } else {
        throw e
      }
    }
  }
}
