import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class RegisterUserDto {
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  password: string

  @IsString()
  @IsNotEmpty()
  phoneno: string
}
