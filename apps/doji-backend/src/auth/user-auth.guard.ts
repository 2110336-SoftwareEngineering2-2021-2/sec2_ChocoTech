import { ExecutionContext, Injectable, createParamDecorator } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserReference } from 'src/auth/auth.service'

@Injectable()
export class UserAuthGuard extends AuthGuard('bearer') {}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserReference =>
    context.switchToHttp().getRequest().user,
)
