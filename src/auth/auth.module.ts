import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('AUTH_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
