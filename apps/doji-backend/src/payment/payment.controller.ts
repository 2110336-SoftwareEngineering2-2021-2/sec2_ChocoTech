import { wrap } from '@mikro-orm/core'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common'
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import Omise from 'omise'

import { MeResponseDTO } from '@backend/auth/auth.dto'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import {
  CoinTransactionService,
  InsufficientFundError,
} from '@backend/payment/coin-transaction.service'
import {
  AttachCardRequestDTO,
  DepositRequest,
  UserTransactionLineResponseDTO,
  WithdrawalRequest,
} from '@backend/payment/payment.dto'
import { PaymentService } from '@backend/payment/payment.service'
import { IUserReference } from '@backend/types'

@Controller('payment')
@UseGuards(UserAuthGuard)
@ApiCookieAuth()
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly coinTransactionService: CoinTransactionService,
  ) {}

  @Get('cards')
  @ApiOperation({ description: 'Get user credit cards' })
  @ApiResponse({ status: 403, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'The value associated with the given token' })
  async getCreditCards(@CurrentUser() userRef: IUserReference): Promise<Omise.Cards.ICard[]> {
    return await this.paymentService.retrieveCreditCards(await userRef.getUser())
  }

  @Post('cards')
  @ApiOperation({ description: 'Attach new card to a given user' })
  @ApiResponse({ status: 403, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'The value associated with the given token' })
  async attachCreditCard(
    @Body() dto: AttachCardRequestDTO,
    @CurrentUser() userRef: IUserReference,
  ): Promise<MeResponseDTO> {
    const updatedUser = await this.paymentService.attachCreditCard(
      await userRef.getUser(),
      dto.cardToken,
      dto.isDefault,
    )
    return wrap(updatedUser).toJSON() as MeResponseDTO
  }

  @Delete('cards/:cardId')
  @ApiOperation({ description: 'Delete credit card with given cardId' })
  @ApiResponse({ status: 403, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'The value associated with the given token' })
  async deleteCreditCard(
    @Param('cardId') cardId: string,
    @CurrentUser() userRef: IUserReference,
  ): Promise<void> {
    await this.paymentService.deleteCreditCard(await userRef.getUser(), cardId)
  }

  @Get('transaction')
  @ApiOperation({ description: "Retrieve user's transaction" })
  @ApiResponse({ status: 200, type: [UserTransactionLineResponseDTO] })
  async getUserTransactions(
    @CurrentUser() userRef: IUserReference,
  ): Promise<UserTransactionLineResponseDTO[]> {
    return await this.coinTransactionService.getUserTransactions(await userRef.getUser())
  }

  @Post('deposit')
  @ApiOperation({ description: 'Deposite doji coin' })
  @ApiResponse({ status: 422, description: 'Invalid Card' })
  async deposit(@CurrentUser() userRef: IUserReference, @Body() dto: DepositRequest) {
    await this.paymentService.deposit(await userRef.getUser(), dto.amount, dto.cardId)
  }

  @Post('withdraw')
  @ApiOperation({ description: 'Withdraw Doji Coin' })
  @ApiResponse({ status: 422, description: 'Insufficient Fund' })
  async withdraw(@CurrentUser() userRef: IUserReference, @Body() dto: WithdrawalRequest) {
    try {
      await this.paymentService.withdraw(
        await userRef.getUser(),
        dto.amount,
        dto.destinationAccount,
      )
    } catch (e) {
      if (e instanceof InsufficientFundError) {
        throw new UnprocessableEntityException('Insufficient Fund')
      } else {
        throw e
      }
    }
  }
}
