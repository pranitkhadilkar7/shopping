import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { IsNotEmail } from '../../common/decorators/validators/is-not-email.decorator'

export class SignupDto {
  @IsString()
  @IsNotEmail({ message: 'Username can not be an email' })
  username: string

  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  password: string

  @IsString()
  @IsNotEmpty()
  phoneno: string
}
