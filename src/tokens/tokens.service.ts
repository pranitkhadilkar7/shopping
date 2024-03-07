import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Token } from './token.entity'
import { FindOptionsRelations, Repository } from 'typeorm'
import { UserRole } from '../roles/role.enum'
import { UsersService } from '../users/users.service'
import { v4 as uuidv4 } from 'uuid'
import { TokenType } from './token.enum'
import { RolesService } from '../roles/roles.service'

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token) private tokensRepo: Repository<Token>,
    private usersService: UsersService,
    private rolesService: RolesService,
  ) {}

  findByToken(token: string, relations?: FindOptionsRelations<Token>) {
    return this.tokensRepo.findOne({ where: { token }, relations })
  }

  saveToken(data: Partial<Token>) {
    const token = this.tokensRepo.create(data)
    return this.tokensRepo.save(token)
  }

  deleteExpiredToken() {
    return this.tokensRepo
      .createQueryBuilder()
      .delete()
      .where('expiry_date <= :currentDate', { currentDate: new Date() })
      .execute()
  }

  deleteTokenById(id: number) {
    return this.tokensRepo.delete({ id })
  }

  async createAndsaveRegistrationToken(
    email: string,
    userRole: UserRole,
    creatorId: number,
  ) {
    const creator = await this.usersService.findById(creatorId)
    if (!creator) {
      throw new UnauthorizedException('User does not exists')
    }
    const role = await this.rolesService.findByRoleName(userRole)
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 1)
    await this.saveToken({
      token: uuidv4(),
      createdBy: creator,
      tokenType: TokenType.USER_REGISTRATION_INVITE,
      expiryDate,
      email,
      role,
    })
    return {
      message: 'User registration invite sent successfully',
    }
  }
}
