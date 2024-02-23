import { UserRole } from '../../roles/role.enum'

export type UserPayload = {
  userId: number
  userRoles: UserRole[]
}
