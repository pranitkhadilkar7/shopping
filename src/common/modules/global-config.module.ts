import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { databaseConfig } from '../../config/database.config'

@Module({
  imports: [
    CacheModule.register({ isGlobal: true, ttl: 60000 }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [databaseConfig],
    }),
  ],
})
export class GlobalConfigModule {}
