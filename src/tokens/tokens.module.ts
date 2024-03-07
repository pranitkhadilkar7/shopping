import { Module } from '@nestjs/common'
import { TokensService } from './tokens.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Token } from './token.entity'
import { TokensController } from './tokens.controller'
import { UsersModule } from '../users/users.module'
import { RolesModule } from '../roles/roles.module'

@Module({
  imports: [TypeOrmModule.forFeature([Token]), UsersModule, RolesModule],
  providers: [TokensService],
  exports: [TokensService],
  controllers: [TokensController],
})
export class TokensModule {}
