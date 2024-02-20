import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from './role.entity'
import { Repository } from 'typeorm'
import { UserRole } from './role.enum'

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private rolesRepo: Repository<Role>) {}

  findByRoleName(roleName: UserRole) {
    return this.rolesRepo.findOneBy({ name: roleName })
  }

  findAll() {
    return this.rolesRepo.find({ relations: { createdBy: true } })
  }
}
