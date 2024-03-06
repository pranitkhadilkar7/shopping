import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Token } from './token.entity'
import { FindOptionsRelations, Repository } from 'typeorm'

@Injectable()
export class TokensService {
  constructor(@InjectRepository(Token) private tokensRepo: Repository<Token>) {}

  findByToken(token: string, relations?: FindOptionsRelations<Token>) {
    return this.tokensRepo.findOne({ where: { token }, relations })
  }

  createToken(data: Partial<Token>) {
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
}
