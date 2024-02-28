import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP')
  use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl } = request
    const userAgent = request.get('user-agent') || ''
    this.logger.log(`Starting ${method} ${originalUrl} - ${userAgent}`)
    response.on('finish', () => {
      const { statusCode } = response
      this.logger.log(
        `Ending ${method} ${originalUrl} ${statusCode} - ${userAgent}`,
      )
    })
    next()
  }
}
