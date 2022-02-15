import { UserReference } from '@backend/auth/auth.service'
import { ExecutionContext, Injectable, createParamDecorator } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class UserAuthGuard extends AuthGuard('bearer') {}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserReference =>
    context.switchToHttp().getRequest().user,
)
