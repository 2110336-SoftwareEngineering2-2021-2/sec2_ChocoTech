import { AuthService, UserReference } from '@backend/auth/auth.service'
import { CurrentUser, UserAuthGuard } from '@backend/auth/user-auth.guard'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Body, Controller, ForbiddenException, Post, UseGuards } from '@nestjs/common'
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

class UserTokenBody {
  @ApiProperty()
  token: string
}

class DebugTokenResultBody {
  @ApiProperty()
  username: string
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('password')
  @UseGuards(ThrottlerGuard)
  @ApiOperation({ description: 'Log user in with username and password' })
  async authWithPassword(@Body() body: PasswordLoginBody): Promise<UserTokenBody> {
    const user = await this.authService.userFromUsernamePassword(body.username, body.password)
    if (!user) {
      throw new ForbiddenException('No user with such username or password is incorrect')
    }
    return {
      token: await this.authService.issueTokenForUser(user),
    }
  }

  @Post('debug_token')
  @UseGuards(UserAuthGuard, ThrottlerGuard)
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
