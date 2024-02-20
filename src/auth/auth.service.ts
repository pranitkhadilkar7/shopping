import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { SignupDto } from './dto/signup.dto'
import { compare, hash } from 'bcrypt'
import { UserRole } from 'src/roles/role.enum'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'

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
    const payload = { userId: user.id }
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
