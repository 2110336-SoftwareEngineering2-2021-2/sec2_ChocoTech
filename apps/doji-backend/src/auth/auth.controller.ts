import { MeResponseDTO } from '@backend/auth/auth.dto'
import { AuthService } from '@backend/auth/auth.service'
import { Cookie } from '@backend/auth/cookie.decorator'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import { environment } from '@backend/environments/environment'
import { IResetPasswordBody, ISendResetPasswordEmailBody, IUserReference } from '@libs/api'
import { Body, Controller, Get, Param, Post, Query, Redirect, Res, UseGuards } from '@nestjs/common'
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
  @Redirect()
  @UseGuards(ThrottlerGuard)
  @ApiOperation({ description: 'Log user in with username and password' })
  async loginWithPassword(
    @Res({ passthrough: true }) res: Response,
    @Body() body: PasswordLoginBody,
    @Query('rediectUrl') rediectUrl: string = environment.domain.frontend,
  ) {
    const { username, password } = body
    const { accessToken, maxAge } = await this.authService.loginWithPassword(username, password)
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: maxAge,
    })
    return {
      url: rediectUrl,
    }
  }

  @Get('google')
  @Redirect()
  @ApiOperation({ description: 'Log user in with Google oauth' })
  async loginWithGoogle(
    @Cookie('accessToken') accessToken,
    @Query('rediectUrl') rediectUrl: string = environment.domain.frontend,
  ) {
    console.log(accessToken)
    const googleUrl = await this.authService.generateGoogleLoginURL(accessToken, rediectUrl)
    console.log(googleUrl)
    return {
      url: googleUrl,
      statusCode: 302,
    }
  }

  @Get('google/callback')
  @Redirect()
  @ApiOperation({ description: 'Google oauth callback' })
  async loginWithGoogleCallback(
    @Res({ passthrough: true }) res: Response,
    @Query('code') code: string,
    @Query('state') state: string,
  ) {
    const { accessToken: userToken, rediectUrl } = JSON.parse(state)
    const userRef = await this.authService.validateAccessToken(userToken)
    const { username } = await userRef.getUser()
    const { access_token, expiry_date } = await this.authService.loginWithGoogleOAuth(
      code,
      username,
    )
    res.cookie('googleAccessToken', access_token, {
      httpOnly: true,
      maxAge: expiry_date,
    })
    return {
      url: rediectUrl,
    }
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
