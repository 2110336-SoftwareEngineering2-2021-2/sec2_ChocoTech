import { environment } from '@backend/environments/environment'
import { User } from '@libs/api'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import axios from 'axios'
import Omise from 'omise'

@Injectable()
export class PaymentService {
  private readonly omise: Omise.IOmise = Omise(environment.omise)

  constructor(@InjectRepository(User) private readonly userRepo: EntityRepository<User>) {}

  async setCardAsDefault(user: User, cardToken: string): Promise<void> {
    await axios.patch(
      `https://api.omise.co/customers/${user.omiseCustomerToken}`,
      {
        default_card: cardToken,
      },
      {
        auth: {
          username: environment.omise.secretKey,
          password: '',
        },
      },
    )
  }

  async createCustomer(user: User, cardToken?: string): Promise<User> {
    const customer = await this.omise.customers.create({
      email: user.email,
      description: user.username,
      card: cardToken,
    })

    user.omiseCustomerToken = customer.id

    await this.userRepo.persistAndFlush(user)
    return user
  }

  async attachCard(user: User, cardToken: string, isDefault?: boolean): Promise<User> {
    if (!user.omiseCustomerToken) {
      return this.createCustomer(user, cardToken)
    }

    await this.omise.customers.update(user.omiseCustomerToken, {
      card: cardToken,
    })

    if (isDefault) await this.setCardAsDefault(user, cardToken)

    return user
  }
}
