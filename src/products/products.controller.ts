import { Controller, Get } from '@nestjs/common'
import { Roles } from 'src/common/decorators/roles.decorator'
import { UserRole } from 'src/roles/role.enum'

@Controller('products')
export class ProductsController {
  @Roles(UserRole.MERCHANT)
  @Get('all')
  get() {
    return 'api to get all products'
  }
}
