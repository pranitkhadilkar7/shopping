import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { databaseConfig } from '../../config/database.config'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    CacheModule.register({ isGlobal: true, ttl: 60000 }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [databaseConfig],
    }),
    ScheduleModule.forRoot(),
  ],
})
export class GlobalConfigModule {}
