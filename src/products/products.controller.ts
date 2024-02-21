import { Controller, Get } from '@nestjs/common'

@Controller('products')
export class ProductsController {
  @Get('all')
  get() {
    return 'api to get all products'
  }
}
