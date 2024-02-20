import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { SignupDto } from './dto/signup.dto'
import { hash } from 'bcrypt'
import { ConfigService } from '@nestjs/config'

const SALT_OR_HASH = 10

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async registerUser(userInfo: SignupDto) {
    const user = await this.usersService.findByEmailOrUsername(
      userInfo.email,
      userInfo.username,
    )
    if (user.length) {
      throw new BadRequestException('User already exists!')
    }
    console.warn(this.configService.get<number>('SALT_OR_HASH'))
    const hashedPassword = await hash(userInfo.password, SALT_OR_HASH)
    return this.usersService.save({ ...userInfo, password: hashedPassword })
  }
}
