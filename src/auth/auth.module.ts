import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { TokensModule } from '../tokens/tokens.module'
import { RolesModule } from '../roles/roles.module'

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('AUTH_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    UsersModule,
    RolesModule,
    TokensModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
