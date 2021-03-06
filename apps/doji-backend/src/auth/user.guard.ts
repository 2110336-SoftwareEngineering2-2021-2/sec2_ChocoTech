import { ExecutionContext, Injectable, createParamDecorator } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { UserRole } from '@backend/entities/User'
import { IUserReference } from '@backend/types'

@Injectable()
export class UserAuthGuard extends AuthGuard('auth') {}

@Injectable()
export class ExpertAuthGuard extends UserAuthGuard {
  async canActivate(context: ExecutionContext) {
    const canActivate = await super.canActivate(context)
    if (!canActivate) {
      return false
    }

    const request = context.switchToHttp().getRequest()
    const userRef = request.user as IUserReference
    const user = await userRef.getUser()

    if (user && user.role === UserRole.EXPERT) {
      return true
    }
    return false
  }
}

export const CurrentUser = createParamDecorator<undefined>(
  (data, context: ExecutionContext): IUserReference => context.switchToHttp().getRequest().user,
)
