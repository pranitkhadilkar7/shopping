import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { UserPayload } from '../common/types/user-payload.type'
import { Request } from 'express'
import { UserRole } from '../roles/role.enum'

@Injectable()
export class UserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & UserPayload>()
    const type = request?.body?.type as UserRole
    if (
      type === UserRole.CONSUMER &&
      request?.userRoles.includes(UserRole.MERCHANT)
    ) {
      return true
    }
    return false
  }
}
