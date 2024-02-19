import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './role.entity'
import { RolesController } from './roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
