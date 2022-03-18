import { IUserReference } from '@libs/api'
import { ExecutionContext, Injectable, createParamDecorator } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class UserAuthGuard extends AuthGuard('bearer') {}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IUserReference =>
    context.switchToHttp().getRequest().user,
)
