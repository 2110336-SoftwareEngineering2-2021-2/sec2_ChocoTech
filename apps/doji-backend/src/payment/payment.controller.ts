import { MeResponseDTO } from '@backend/auth/auth.dto'
import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { AttachCardRequestDTO } from '@backend/payment/payment.dto'
import { PaymentService } from '@backend/payment/payment.service'
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import Omise from 'omise'

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Get('cards')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ description: 'Get user credit cards' })
  @ApiResponse({ status: 403, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'The value associated with the given token' })
  @ApiBearerAuth()
  async getCreditCards(@CurrentUser() userRef: UserReference): Promise<Omise.Cards.ICardList> {
    const user = await userRef.getUser()
    return await this.paymentService.retrieveCreditCards(user)
  }

  @Post('card')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ description: 'Attach new card to a given user' })
  @ApiResponse({ status: 403, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'The value associated with the given token' })
  @ApiBearerAuth()
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
    delete updatedUser.passwordHash
    return updatedUser
  }
}
