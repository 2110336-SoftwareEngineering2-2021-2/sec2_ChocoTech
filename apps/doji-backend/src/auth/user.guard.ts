import { User, UserRole } from '@backend/entities/User'
import { IUserReference } from '@libs/api'
import { ExecutionContext, Injectable, createParamDecorator } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class UserAuthGuard extends AuthGuard('auth') {}

export class ExpertAuthGuard extends AuthGuard('auth') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const user = request.user as User
    if (user && user.role === UserRole.EXPERT) {
      return true
    }
    return false
  }
}

export const CurrentUser = createParamDecorator<undefined>(
  (data, context: ExecutionContext): IUserReference => context.switchToHttp().getRequest().user,
)
