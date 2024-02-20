import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { SignupDto } from './dto/signup.dto'
import { hash } from 'bcrypt'
import { UserRole } from 'src/roles/role.enum'

const SALT_OR_HASH = 10

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async registerUser(userInfo: SignupDto) {
    const user = await this.usersService.findByEmailOrUsername(
      userInfo.email,
      userInfo.username,
    )
    if (user.length) {
      throw new BadRequestException('User already exists!')
    }
    const hashedPassword = await hash(userInfo.password, SALT_OR_HASH)
    return this.usersService.saveWithRole(
      { ...userInfo, password: hashedPassword },
      UserRole.MERCHANT,
    )
  }
}
