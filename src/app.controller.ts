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
  getHello(): number {
    console.log(process.env.host)
    return this.configService.get<number>('host')
  }
}
