import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { UserPayload } from '../types/user-payload.type'

export const User = createParamDecorator(
  (data: keyof UserPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request & UserPayload>()
    return data
      ? request[data]
      : ({
          userId: request.userId,
          userRoles: request.userRoles,
        } as UserPayload)
  },
)
