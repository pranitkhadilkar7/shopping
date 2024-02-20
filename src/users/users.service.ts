import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

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
    return this.usersRepo.find({ where: [{ email }, { username }] })
  }

  save(data: Partial<User>) {
    const user = this.usersRepo.create(data)
    return this.usersRepo.save(user)
  }
}
