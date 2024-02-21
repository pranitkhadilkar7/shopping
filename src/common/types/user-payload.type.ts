import { UserRole } from 'src/roles/role.enum'

export type UserPayload = {
  userId: number
  userRoles: UserRole[]
}
