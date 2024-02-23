import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { RolesService } from '../roles/roles.service'
import { UserRole } from '../roles/role.enum'
import { hash } from 'bcrypt'
import { SALT_OR_HASH } from '../common/constants/password-hash.constant'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private rolesService: RolesService,
  ) {}

  findById(id: number) {
    return this.usersRepo.findOne({ where: { id }, relations: { roles: true } })
  }

  findByEmailOrUsername(email: string, username: string) {
    return this.usersRepo.findOne({
      where: [{ email }, { username }],
      relations: { roles: true },
    })
  }

  save(data: Partial<User>) {
    const user = this.usersRepo.create(data)
    return this.usersRepo.save(user)
  }

  async saveWithRole(data: Partial<User>, roleName: UserRole) {
    const user = this.usersRepo.create(data)
    const role = await this.rolesService.findByRoleName(roleName)
    user.roles = [role]
    return this.usersRepo.save(user)
  }

  async create(data: Partial<User>, roleName: UserRole, creatorId: number) {
    const user = await this.findByEmailOrUsername(data.email, data.username)
    const creator = await this.findById(creatorId)
    if (!user) {
      const hashedPassword = await hash(data.password, SALT_OR_HASH)
      if (
        roleName === UserRole.CONSUMER &&
        !!creator.roles.find((role) => role.name === UserRole.MERCHANT)
      ) {
        return this.saveWithRole(
          { ...data, password: hashedPassword, merchants: [creator] },
          roleName,
        )
      }
    } else {
      throw new BadRequestException('User Already exists')
    }
  }
}
