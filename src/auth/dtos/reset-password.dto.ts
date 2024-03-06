import { IsNotEmpty, IsString } from 'class-validator'
import { Match } from '../../common/decorators/validators/match-validator.decorator'

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  @Match('password', { message: 'Password must be same as confirm password' })
  confirmPassword: string
}
