import { InjectRepository } from '@mikro-orm/nestjs'
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { Request, Response } from 'express'
import Redis from 'ioredis'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import { AuthService, UserReference } from 'src/auth/auth.service'
import { CurrentUser, UserAuthGuard } from 'src/auth/user-auth.guard'

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

// const redisClient = new Redis({ enableOfflineQueue: false })

// const maxWrongAttemptsByIPperDay = 100
// const maxConsecutiveFailsByUsernameAndIP = 5

// const limiterSlowBruteByIP = new RateLimiterRedis({
//   storeClient: redisClient,
//   keyPrefix: 'login_fail_ip_per_day',
//   points: maxWrongAttemptsByIPperDay,
//   duration: 60 * 60 * 24,
//   blockDuration: 60 * 60 * 24, // Block for 1 day, if 100 wrong attempts per day
// })

// const limiterConsecutiveFailsByUsernameAndIP = new RateLimiterRedis({
//   storeClient: redisClient,
//   keyPrefix: 'login_fail_consecutive_username_and_ip',
//   points: maxConsecutiveFailsByUsernameAndIP,
//   duration: 60 * 60 * 24 * 90, // Store number for 90 days since first fail
//   blockDuration: 60 * 60, // Block for 1 hour
// })

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('password')
  @ApiOperation({ description: 'Log user in with username and password' })
  async authWithPassword(
    // @Req() req: Request,
    // @Res() res: Response,
    @Body() body: PasswordLoginBody,
  ): Promise<UserTokenBody> {
    // const usernameIPkey = this.authService.getUsernameIPkey(body.username, req.ip)

    // const [resUsernameAndIP, resSlowByIP] = await Promise.all([
    //   limiterConsecutiveFailsByUsernameAndIP.get(usernameIPkey),
    //   limiterSlowBruteByIP.get(req.ip),
    // ])

    // let retrySecs = 0

    // // Check if IP or Username + IP is already blocked
    // if (resSlowByIP !== null && resSlowByIP.consumedPoints > maxWrongAttemptsByIPperDay) {
    //   retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1
    // } else if (
    //   resUsernameAndIP !== null &&
    //   resUsernameAndIP.consumedPoints > maxConsecutiveFailsByUsernameAndIP
    // ) {
    //   retrySecs = Math.round(resUsernameAndIP.msBeforeNext / 1000) || 1
    // }

    // if (retrySecs > 0) {
    //   res.set('Retry-After', String(retrySecs))
    //   res.status(429).send('Too Many Requests')
    // } else {
    //   const authRes = this.authService.authorise(loginUserData)
    //   if (!authRes.isLoggedIn) {
    //     // Consume 1 point from limiters on wrong attempt and block if limits reached
    //     try {
    //       const promises = [limiterSlowBruteByIP.consume(req.ip)]
    //       if (authRes.exists) {
    //         // Count failed attempts by Username + IP only for registered users
    //         promises.push(limiterConsecutiveFailsByUsernameAndIP.consume(usernameIPkey))
    //       }

    //       await promises

    //       res.status(400).end('email or password is wrong')
    //     } catch (rlRejected) {
    //       if (rlRejected instanceof Error) {
    //         throw rlRejected
    //       } else {
    //         res.set('Retry-After', String(Math.round(rlRejected.msBeforeNext / 1000) || 1))
    //         res.status(429).send('Too Many Requests')
    //       }
    //     }
    //   }

    //   if (authRes.isLoggedIn) {
    //     if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > 0) {
    //       // Reset on successful authorisation
    //       await limiterConsecutiveFailsByUsernameAndIP.delete(usernameIPkey)
    //     }

    //     res.end('authorized')
    //   }
    // }

    const user = await this.authService.userFromUsernamePassword(body.username, body.password)
    if (!user) {
      throw new ForbiddenException('No user with such username or password is incorrect')
    }
    return {
      token: await this.authService.issueTokenForUser(user),
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
