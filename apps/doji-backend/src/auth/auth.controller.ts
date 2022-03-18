import { LoginResponseDTO, MeResponseDTO } from '@backend/auth/auth.dto'
import { AuthService } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { IResetPasswordBody, ISendResetPasswordEmailBody, IUser, IUserReference } from '@libs/api'
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'
import { IsEmail, IsString } from 'class-validator'
import { Response } from 'express'

class PasswordLoginBody {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  password: string
}

class SendResetPasswordEmailBody implements ISendResetPasswordEmailBody {
  @ApiProperty()
  @IsEmail()
  email: string
}

class ResetPasswordBody implements IResetPasswordBody {
  @ApiProperty()
  @IsString()
  newPassword: string
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ description: 'Get current user information' })
  @ApiResponse({ status: 403, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'The value associated with the given token' })
  @ApiBearerAuth()
  async getUserInformation(@CurrentUser() userRef: IUserReference): Promise<MeResponseDTO> {
    return await userRef.getUser()
  }

  @Post('password')
  @UseGuards(ThrottlerGuard)
  @ApiOperation({ description: 'Log user in with username and password' })
  async loginWithPassword(
    @Res({ passthrough: true }) res: Response,
    @Body() body: PasswordLoginBody,
  ): Promise<void> {
    const { username, password } = body
    const { accessToken, user } = await this.authService.loginWithPassword(username, password)
    res
      .cookie('accessToken', accessToken)
      .status(HttpStatus.OK)
      .json({
        token: accessToken,
        user,
      } as LoginResponseDTO)
  }

  @Get('google')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ description: 'Log user in with Google oauth' })
  async loginWithGoogle(
    @CurrentUser() userRef: IUserReference,
    @Query('rediectUrl') rediectUrl?: string,
  ): Promise<string> {
    const { username } = await userRef.getUser()
    const url = await this.authService.generateGoogleLoginURL(username, rediectUrl)
    return url
  }

  @Get('google/callback')
  @ApiOperation({ description: 'Google oauth callback' })
  async loginWithGoogleCallback(
    @Res() res: Response,
    @Query('code') code: string,
    @Query('state') state: string,
  ): Promise<void> {
    const { accessToken: userToken } = JSON.parse(state)
    const userRef = await this.authService.validatePasswordLogin(userToken)
    const { username } = await userRef.getUser()
    const { accessToken, user } = await this.authService.loginWithGoogleOAuth(code, username)
    res
      .cookie('googleAccessToken', accessToken)
      .status(HttpStatus.OK)
      .json({
        token: accessToken,
        user,
      } as LoginResponseDTO)
  }

  @Post('reset-password')
  @UseGuards(ThrottlerGuard)
  @ApiOperation({ description: 'User request to reset password by email' })
  async requestResetPassword(@Body() body: SendResetPasswordEmailBody): Promise<void> {
    await this.authService.sendResetPasswordEmail(body.email)
  }

  @Post('reset-password/:token')
  @UseGuards(ThrottlerGuard)
  @ApiOperation({ description: 'Reset user password' })
  async resetPassword(
    @Param('token') token: string,
    @Body() dto: ResetPasswordBody,
  ): Promise<void> {
    await this.authService.resetPassword(token, dto.newPassword)
  }
}
