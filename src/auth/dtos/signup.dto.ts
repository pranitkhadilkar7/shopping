import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class SignupDto {
  @IsString()
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
