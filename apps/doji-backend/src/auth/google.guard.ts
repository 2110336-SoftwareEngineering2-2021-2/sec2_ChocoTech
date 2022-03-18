import { IGoogleUser } from '@libs/api'
import { ExecutionContext, Injectable, createParamDecorator } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}

export const CurrentGoogleUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IGoogleUser =>
    context.switchToHttp().getRequest().user,
)
