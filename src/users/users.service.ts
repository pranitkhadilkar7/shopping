import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { RolesService } from 'src/roles/roles.service'
import { UserRole } from 'src/roles/role.enum'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private rolesService: RolesService,
  ) {}

  findAll() {
    return this.usersRepo.find({
      relations: { roles: true, merchants: true, consumers: true },
    })
  }

  findById(id: number) {
    return this.usersRepo.findOneBy({ id })
  }

  findByUsername(username: string) {
    return this.usersRepo.findOneBy({ username })
  }

  findByEmail(email: string) {
    return this.usersRepo.findOneBy({ email })
  }

  findByEmailOrUsername(email: string, username: string) {
    return this.usersRepo.findOne({ where: [{ email }, { username }] })
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
}
