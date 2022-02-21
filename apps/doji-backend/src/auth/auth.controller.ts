import { AuthService, UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { LoginResponseDTO, MeResponseDTO } from '@libs/api'
import { Body, Controller, ForbiddenException, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'
import { IsString } from 'class-validator'

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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ description: 'Get current user information' })
  @ApiResponse({ status: 403, description: 'The token is invalid' })
  @ApiResponse({ status: 200, description: 'The value associated with the given token' })
  @ApiBearerAuth()
  async getUserInformation(@CurrentUser() userRef: UserReference): Promise<MeResponseDTO> {
    const user = await userRef.getUser()
    delete user.passwordHash
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
  getCurrentUserFromToken(@CurrentUser() user: UserReference): DebugTokenResultBody {
    return {
      username: user.username,
    }
  }
}
