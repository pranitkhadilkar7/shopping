import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GlobalGuardsModule } from './common/modules/global-guards.module'
import { ApplicationModule } from './common/modules/application.module'
import { GlobalInterceptorsModule } from './common/modules/global-interceptors.module'
import { GlobalPipesModule } from './common/modules/global-pipes.module'
import { CacheConfigModule } from './cache/cache.module'
import { GlobalConfigModule } from './common/modules/global-config.module'
import { ConfigService } from '@nestjs/config'
import { EventsModule } from './events/events.module'
import { MiddlewareModule } from './common/modules/middleware.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('host'),
        port: configService.get<number>('port'),
        database: configService.get<string>('database'),
        username: configService.get<string>('username'),
        password: configService.get<string>('password'),
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    GlobalConfigModule,
    GlobalGuardsModule,
    GlobalInterceptorsModule,
    GlobalPipesModule,
    MiddlewareModule,
    ApplicationModule,
    CacheConfigModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
