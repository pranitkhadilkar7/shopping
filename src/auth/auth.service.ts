import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { SignupDto } from './dtos/signup.dto'
import { compare, hash } from 'bcrypt'
import { LoginDto } from './dtos/login.dto'
import { JwtService } from '@nestjs/jwt'
import { UserPayload } from '../common/types/user-payload.type'
import { SALT_OR_HASH } from '../common/constants/password-hash.constant'
import { ForgotPasswordDto } from './dtos/forgot-password.dto'
import { TokensService } from '../tokens/tokens.service'
import { v4 as uuidv4 } from 'uuid'
import { TokenType } from '../tokens/token.enum'
import { RegisterUserDto } from './dtos/register-user.dto'
import { RolesService } from '../roles/roles.service'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private jwtService: JwtService,
    private tokensService: TokensService,
  ) {}

  async registerUser(userInfo: SignupDto) {
    this.logger.log(
      `Fetching user for username, email --> ${userInfo.username}, ${userInfo.email}`,
    )
    const user = await this.usersService.findByEmailOrUsername(
      userInfo.email,
      userInfo.username,
    )
    if (user) {
      throw new BadRequestException('User already exists!')
    }
    this.logger.log(`Ferching role info for role ${userInfo.role}`)
    const role = await this.rolesService.findByRoleName(userInfo.role)
    const hashedPassword = await hash(userInfo.password, SALT_OR_HASH)
    this.logger.log(`Saving user info for user ${userInfo.email}`)
    return this.usersService.save({
      username: userInfo.username,
      email: userInfo.email,
      phoneno: userInfo.phoneno,
      roles: [role],
      password: hashedPassword,
    })
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
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 1)
    const tokenInfo = await this.tokensService.saveToken({
      token: uuidv4(),
      createdBy: user,
      tokenType: TokenType.FORGOT_PASSWORD,
      createdFor: user,
      expiryDate,
    })

    return {
      token: tokenInfo.token,
    }
  }

  async resetPassword(token: string, password: string) {
    this.logger.log(`Fetching token info for token ${token}`)
    const tokenInfo = await this.tokensService.findByToken(token, {
      createdFor: true,
    })
    if (!tokenInfo || tokenInfo.expiryDate <= new Date()) {
      throw new BadRequestException('Invalid token')
    }
    const hashedPassword = await hash(password, SALT_OR_HASH)
    this.logger.log(`Updating password for user id ${tokenInfo.id}`)
    const updateResult = await this.usersService.editById(
      tokenInfo.createdFor.id,
      { password: hashedPassword },
    )
    if (!updateResult) {
      throw new HttpException('Unable to update password', 500)
    }
    this.logger.log(`Deleting token ${token}`)
    await this.tokensService.deleteTokenById(tokenInfo.id)
    return {
      message: 'Password updated successfully',
    }
  }

  async registerUserFromToken(
    registerUserInfo: RegisterUserDto,
    token: string,
  ) {
    this.logger.log(`Fetching token info using token ${token}`)
    const tokenInfo = await this.tokensService.findByToken(token, {
      role: true,
      createdBy: true,
    })
    if (!tokenInfo || tokenInfo?.expiryDate <= new Date()) {
      throw new BadRequestException('Invalid token')
    }
    this.logger.log(
      `Fetching user info for user with username ${registerUserInfo.username} and email ${tokenInfo.email}`,
    )
    const user = await this.usersService.findByEmailOrUsername(
      tokenInfo.email,
      registerUserInfo.username,
    )
    if (user) {
      throw new BadRequestException('User already exists')
    }
    this.logger.log(`Fetching role info for role ${tokenInfo.role.name}`)
    const role = await this.rolesService.findByRoleName(tokenInfo.role.name)
    if (!role) {
      throw new BadRequestException('Role does not exists')
    }
    const hashedPassword = await hash(registerUserInfo.password, SALT_OR_HASH)
    this.logger.log(
      `Creating new user for email, username --> ${tokenInfo.email}, ${registerUserInfo.username}`,
    )
    const savedUser = await this.usersService.save({
      username: registerUserInfo.username,
      email: tokenInfo.email,
      phoneno: registerUserInfo.phoneno,
      password: hashedPassword,
      createdBy: tokenInfo.createdBy.id,
      roles: [role],
    })
    if (!savedUser) {
      throw new HttpException('Unable to create user', 500)
    }
    this.logger.log(`Deleting token ${token}`)
    await this.tokensService.deleteTokenById(tokenInfo.id)
    return {
      message: 'User created successfully',
    }
  }
}
