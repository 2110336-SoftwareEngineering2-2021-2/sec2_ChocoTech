import { IUserReference } from '@libs/api'
import { ExecutionContext, Injectable, createParamDecorator } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}

export const CurrentZoomUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IUserReference =>
    context.switchToHttp().getRequest().user,
)
