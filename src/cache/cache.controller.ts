import { Controller, Get, Inject } from '@nestjs/common'
import { Public } from '../common/decorators/public.decorator'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Public()
@Controller('cache')
export class CacheController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  @Get('set')
  async setCache() {
    await this.cacheManager.set('key', 'value', 60000)
    return { message: 'key set' }
  }

  @Get('get')
  async getCache() {
    const value = await this.cacheManager.get<string>('key')
    return { value }
  }
}
