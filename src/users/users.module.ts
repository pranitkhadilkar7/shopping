import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { RolesModule } from '../roles/roles.module'
import { EventsModule } from '../events/events.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule, EventsModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
