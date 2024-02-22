import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserRole } from './role.enum'
import { ROLE_KEY } from 'src/common/decorators/roles.decorator'
import { Request } from 'express'
import { UserPayload } from 'src/common/types/user-payload.type'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndMerge<UserRole[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!roles) {
      return true
    }
    const userRoles =
      context.switchToHttp().getRequest<Request & UserPayload>().userRoles ?? []

    return roles.every((role) => userRoles.includes(role))
  }
}
