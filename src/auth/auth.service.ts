import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { SignupDto } from './dtos/signup.dto'
import { compare, hash } from 'bcrypt'
import { UserRole } from '../roles/role.enum'
import { LoginDto } from './dtos/login.dto'
import { JwtService } from '@nestjs/jwt'
import { UserPayload } from '../common/types/user-payload.type'

const SALT_OR_HASH = 10

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerUser(userInfo: SignupDto) {
    const user = await this.usersService.findByEmailOrUsername(
      userInfo.email,
      userInfo.username,
    )
    if (user) {
      throw new BadRequestException('User already exists!')
    }
    const hashedPassword = await hash(userInfo.password, SALT_OR_HASH)
    return this.usersService.saveWithRole(
      { ...userInfo, password: hashedPassword },
      UserRole.MERCHANT,
    )
  }

  async login(userInfo: LoginDto) {
    const user = await this.usersService.findByEmailOrUsername(
      userInfo.emailOrUsername,
      userInfo.emailOrUsername,
    )
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials')
    }
    const isMatch = await compare(userInfo.password, user.password)
    if (!isMatch) {
      throw new UnauthorizedException('Invalid Credentials')
    }
    const payload: UserPayload = {
      userId: user.id,
      userRoles: user.roles.map((role) => role.name),
    }
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
