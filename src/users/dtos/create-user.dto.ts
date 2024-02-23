import { IsEnum } from 'class-validator'
import { SignupDto } from '../../auth/dtos/signup.dto'
import { UserRole } from '../../roles/role.enum'

export class CreateUserDto extends SignupDto {
  @IsEnum(UserRole)
  type: UserRole
}
