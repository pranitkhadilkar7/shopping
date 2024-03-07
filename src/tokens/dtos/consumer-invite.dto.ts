import { IsNotEmpty, IsString } from 'class-validator'

export class ConsumerInviteDto {
  @IsString()
  @IsNotEmpty()
  emailOrUsername: string
}
