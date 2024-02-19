import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['debug'] })
  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT')
  app.enableCors()
  await app.listen(port)
}
bootstrap()
