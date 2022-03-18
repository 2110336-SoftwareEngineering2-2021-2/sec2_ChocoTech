import { LoginResponseDTO, MeResponseDTO } from '@backend/auth/auth.dto'
import { AuthService } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { IRequestResetPasswordBody, IUserReference } from '@libs/api'
import { Body, Controller, ForbiddenException, Get, Param, Post, UseGuards } from '@nestjs/common'
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

class RequestResetPasswordBody implements IRequestResetPasswordBody {
  @ApiProperty()
  @IsEmail()
  email: string
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
  async requestResetPassword(@Body() body: RequestResetPasswordBody): Promise<void> {
    await this.authService.requestResetPassword(body.email)
  }

  @Post('reset-password/:token')
  @UseGuards(ThrottlerGuard)
  @ApiOperation({ description: 'Log user in with username and password' })
  async resetPassword(@Param('token') token: string): Promise<void> {
    // TODO
  }
}
