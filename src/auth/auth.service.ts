import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { SignupDto } from './dtos/signup.dto'
import { compare, hash } from 'bcrypt'
import { UserRole } from '../roles/role.enum'
import { LoginDto } from './dtos/login.dto'
import { JwtService } from '@nestjs/jwt'
import { UserPayload } from '../common/types/user-payload.type'
import { SALT_OR_HASH } from '../common/constants/password-hash.constant'
import { ForgotPasswordDto } from './dtos/forgot-password.dto'
import { TokensService } from '../tokens/tokens.service'
import { v4 as uuidv4 } from 'uuid'
import { TokenType } from '../tokens/token.enum'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokensService: TokensService,
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
      throw new BadRequestException('Invalid Credentials')
    }
    if (!user.active) {
      throw new ForbiddenException()
    }
    const isMatch = await compare(userInfo.password, user.password)
    if (!isMatch) {
      throw new BadRequestException('Invalid Credentials')
    }
    const payload: UserPayload = {
      userId: user.id,
      userRoles: user.roles.map((role) => role.name),
    }
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  async forgotPassword(userInfo: ForgotPasswordDto) {
    const user = await this.usersService.findByEmailOrUsername(
      userInfo.emailOrUsername,
      userInfo.emailOrUsername,
    )
    if (!user) {
      throw new BadRequestException('User not exists')
    }
    const tokenInfo = await this.tokensService.createToken({
      token: uuidv4(),
      createdBy: user,
      tokenType: TokenType.FORGOT_PASSWORD,
      createdFor: user,
      expiryDate: new Date(),
    })

    return {
      token: tokenInfo.token,
    }
  }
}
