import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  emailOrUsername: string

  @IsString()
  @IsNotEmpty()
  password: string
}
