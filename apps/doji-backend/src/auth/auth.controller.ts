import { LoginResponseDTO, MeResponseDTO } from '@backend/auth/auth.dto'
import { AuthService } from '@backend/auth/auth.service'
import { GoogleAuthGuard } from '@backend/auth/google.guard'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { User } from '@backend/entities/User'
import { IResetPasswordBody, ISendResetPasswordEmailBody, IUserReference } from '@libs/api'
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'
import { IsEmail, IsString } from 'class-validator'

class PasswordLoginBody {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  password: string
}

class DebugTokenResultBody {
  @ApiProperty()
  username: string
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
    const user = await userRef.getUser()
    return user
  }

  @Post('password')
  @UseGuards(ThrottlerGuard)
  @ApiOperation({ description: 'Log user in with username and password' })
  async authWithPassword(@Body() body: PasswordLoginBody): Promise<LoginResponseDTO> {
    const user = await this.authService.userFromUsernamePassword(body.username, body.password)
    if (!user) {
      throw new ForbiddenException('No user with such username or password is incorrect')
    }
    return {
      token: await this.authService.issueTokenForUser(user),
      user: user,
    }
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ description: 'Log user in with Google oauth' })
  async loginWithGoogle(): Promise<void> {
    return
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ description: 'Google oauth callback' })
  async loginWithGoogleCallback(@Req() req): Promise<User> {
    return req.user
  }

  @Post('debug_token')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ description: 'Inspect the token' })
  @ApiResponse({ status: 403, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'The value associated with the given token' })
  @ApiBearerAuth()
  getCurrentUserFromToken(@CurrentUser() user: IUserReference): DebugTokenResultBody {
    return {
      username: user.username,
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
  @ApiOperation({ description: 'Log user in with username and password' })
  async resetPassword(
    @Param('token') token: string,
    @Body() dto: ResetPasswordBody,
  ): Promise<void> {
    await this.authService.resetPassword(token, dto.newPassword)
  }
}
