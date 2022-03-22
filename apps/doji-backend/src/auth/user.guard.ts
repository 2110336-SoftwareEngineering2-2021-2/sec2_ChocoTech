import { IUserReference } from '@libs/api'
import { ExecutionContext, Injectable, createParamDecorator } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class UserAuthGuard extends AuthGuard('auth') {}

export const CurrentUser = createParamDecorator<undefined>(
  (data, context: ExecutionContext): IUserReference => context.switchToHttp().getRequest().user,
)
