import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { databaseConfig } from './config/database.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { GlobalGuardsModule } from './common/modules/global-guards.module'
import { ApplicationModule } from './common/modules/application.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [databaseConfig],
    }),
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
    GlobalGuardsModule,
    ApplicationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        enableDebugMessages: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
