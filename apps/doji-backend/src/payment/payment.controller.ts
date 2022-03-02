import { MeResponseDTO } from '@backend/auth/auth.dto'
import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { CoinTransactionService } from '@backend/payment/coin-transaction.service'
import {
  AttachCardRequestDTO,
  DepositRequest,
  UserTransactionLineResponseDTO,
  WithdrawalRequest,
} from '@backend/payment/payment.dto'
import { PaymentService } from '@backend/payment/payment.service'
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import Omise from 'omise'

@Controller('payment')
@UseGuards(UserAuthGuard)
@ApiBearerAuth()
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly coinTransactionService: CoinTransactionService,
  ) {}

  @Get('cards')
  @ApiOperation({ description: 'Get user credit cards' })
  @ApiResponse({ status: 403, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'The value associated with the given token' })
  async getCreditCards(@CurrentUser() userRef: UserReference): Promise<Omise.Cards.ICard[]> {
    const user = await userRef.getUser()
    return await this.paymentService.retrieveCreditCards(user)
  }

  @Post('cards')
  @ApiOperation({ description: 'Attach new card to a given user' })
  @ApiResponse({ status: 403, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'The value associated with the given token' })
  async attachCreditCard(
    @Body() dto: AttachCardRequestDTO,
    @CurrentUser() userRef: UserReference,
  ): Promise<MeResponseDTO> {
    const user = await userRef.getUser()
    const updatedUser = await this.paymentService.attachCreditCard(
      user,
      dto.cardToken,
      dto.isDefault,
    )
    return updatedUser
  }

  @Delete('cards/:cardId')
  @ApiOperation({ description: 'Delete credit card with given cardId' })
  @ApiResponse({ status: 403, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'The value associated with the given token' })
  async deleteCreditCard(
    @Param('cardId') cardId: string,
    @CurrentUser() userRef: UserReference,
  ): Promise<void> {
    const user = await userRef.getUser()
    await this.paymentService.deleteCreditCard(user, cardId)
  }

  @Get('transaction')
  @ApiOperation({ description: "Retrieve user's transaction" })
  @ApiResponse({ status: 200, type: [UserTransactionLineResponseDTO] })
  async getUserTransactions(
    @CurrentUser() userRef: UserReference,
  ): Promise<UserTransactionLineResponseDTO[]> {
    return await this.coinTransactionService.getUserTransactions(await userRef.getUser())
  }

  @Post('deposit')
  @ApiOperation({ description: 'Deposite doji coin' })
  @ApiResponse({ status: 422, description: 'Invalid Card' })
  async deposit(@CurrentUser() userRef: UserReference, @Body() dto: DepositRequest) {
    await this.paymentService.deposit(await userRef.getUser(), dto.amount, dto.cardId)
  }

  @Post('withdraw')
  @ApiOperation({ description: 'Withdraw Doji Coin' })
  @ApiResponse({ status: 422, description: 'Insufficient Fund' })
  async withdraw(@CurrentUser() userRef: UserReference, @Body() dto: WithdrawalRequest) {
    await this.paymentService.withdraw(await userRef.getUser(), dto.amount, dto.destinationAccount)
  }
}
