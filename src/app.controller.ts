import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ConfigService } from '@nestjs/config'

@Controller('test-env')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.configService.get<string>('AUTH_SECRET')
  }
}
