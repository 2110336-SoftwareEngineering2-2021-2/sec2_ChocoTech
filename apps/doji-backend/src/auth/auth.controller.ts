import { Body, Controller, Get, Param, Post, Query, Redirect, Res, UseGuards } from '@nestjs/common'
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'
import { Response } from 'express'

import {
  UserChangePasswordRequestDTO,
  UserLoginRequestDTO,
  UserRegistrationRequestDTO,
  UserResetPasswordRequest,
  UserSendResetPasswordEmailRequest,
} from '@backend/auth/auth.dto'
import { AuthService } from '@backend/auth/auth.service'
import { Cookie } from '@backend/auth/cookie.decorator'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user.guard'
import { environment } from '@backend/environments/environment'
import { IUserReference } from '@backend/types'

import { CookieKey, IUser } from '@libs/api'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ description: 'Get current user information' })
  @ApiResponse({ status: 403, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'The value associated with the given token' })
  @ApiCookieAuth()
  async getUserInformation(@CurrentUser() userRef: IUserReference): Promise<IUser> {
    return await this.authService.getUserInformation(userRef)
  }

  @Post('login')
  @UseGuards(ThrottlerGuard)
  @ApiOperation({ description: 'Log user in with username and password' })
  async loginWithPassword(
    @Res({ passthrough: true }) res: Response,
    @Body() body: UserLoginRequestDTO,
  ) {
    const { username, password } = body
    const { accessToken, maxAge } = await this.authService.loginWithPassword(username, password)
    res.cookie(CookieKey.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    })
  }

  @Post('logout')
  @UseGuards(ThrottlerGuard)
  @ApiOperation({ description: 'Logout' })
  async logout(
    @Res({ passthrough: true }) res: Response,
    @Cookie(CookieKey.ACCESS_TOKEN) accessToken,
  ) {
    await this.authService.logout(accessToken)
    res.clearCookie(CookieKey.ACCESS_TOKEN)
  }

  @Get('google')
  @Redirect()
  @ApiOperation({ description: 'Log user in with Google oauth' })
  async loginWithGoogle(
    @Cookie(CookieKey.ACCESS_TOKEN) accessToken,
    @Query('rediectUrl') rediectUrl: string = environment.domain.frontend,
  ) {
    try {
      const googleUrl = await this.authService.generateGoogleLoginURL(accessToken, rediectUrl)
      return {
        url: googleUrl,
        statusCode: 302,
      }
    } catch (err) {
      return {
        url: environment.domain.frontend,
        statusCode: 401,
      }
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
    res.cookie(CookieKey.GOOGLE_ACCESS_TOKEN, access_token, {
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
  async requestResetPassword(@Body() body: UserSendResetPasswordEmailRequest): Promise<void> {
    await this.authService.sendResetPasswordEmail(body.email)
  }

  @Post('reset-password/:token')
  @UseGuards(ThrottlerGuard)
  @ApiOperation({ description: 'Reset user password' })
  async resetPassword(
    @Param('token') token: string,
    @Body() dto: UserResetPasswordRequest,
  ): Promise<void> {
    await this.authService.resetPassword(token, dto.newPassword)
  }

  @Post('change-password')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ description: 'Change user password' })
  async changePassword(
    @Body() dto: UserChangePasswordRequestDTO,
    @CurrentUser() userRef: IUserReference,
  ): Promise<void> {
    await this.authService.changePassword(userRef, dto.currentPassword, dto.newPassword)
  }

  @Post('signup')
  async create(@Body() dto: UserRegistrationRequestDTO) {
    await this.authService.signup(dto)
  }

  /**
   * TODO: temporary endpoint, will delete after friend system is implemented
   */
  @UseGuards(UserAuthGuard)
  @Get('users')
  async getAllUsers() {
    return await this.authService.getAllUsers()
  }
}
