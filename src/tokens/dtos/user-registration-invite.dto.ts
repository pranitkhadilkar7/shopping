import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator'
import { UserRole } from '../../roles/role.enum'

export class UserRegistrationInviteDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsEnum(UserRole)
  userRole: UserRole
}
