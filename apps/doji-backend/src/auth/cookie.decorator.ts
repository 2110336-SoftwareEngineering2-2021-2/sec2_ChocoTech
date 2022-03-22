import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const Cookie = createParamDecorator<string | undefined>(
  (data, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest()
    const cookie = req.cookies
    return data ? cookie[data] : cookie
  },
)
