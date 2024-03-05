import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Token } from './token.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TokensService {
  constructor(@InjectRepository(Token) private tokensRepo: Repository<Token>) {}

  findByToken(token: string) {
    return this.tokensRepo.findOneBy({ token })
  }
}
