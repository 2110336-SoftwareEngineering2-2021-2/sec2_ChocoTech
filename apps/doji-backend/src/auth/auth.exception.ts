import { UnauthorizedException } from '@nestjs/common'

export class InvalidToken extends UnauthorizedException {
  constructor() {
    super('Token is invalid or expired.')
  }
}
