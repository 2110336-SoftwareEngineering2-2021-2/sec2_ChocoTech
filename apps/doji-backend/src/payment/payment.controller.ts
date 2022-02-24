import { UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { PaymentService } from '@backend/payment/payment.service'
import { AttachCardRequestDTO, User } from '@libs/api'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('attach_card')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ description: 'Attach new card to a given user' })
  @ApiResponse({ status: 403, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'The value associated with the given token' })
  @ApiBearerAuth()
  async getUserInformation(
    @CurrentUser() userRef: UserReference,
    @Body() dto: AttachCardRequestDTO,
  ): Promise<User> {
    const user = await userRef.getUser()
    const updatedUser = await this.paymentService.attachCard(user, dto.cardToken, dto.isDefault)
    delete updatedUser.passwordHash
    return updatedUser
  }
}
