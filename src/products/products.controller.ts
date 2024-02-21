import { Body, Controller, Get, Post } from '@nestjs/common'
import { Roles } from 'src/common/decorators/roles.decorator'
import { UserRole } from 'src/roles/role.enum'
import { CreateProductDto } from './dtos/create-product.dto'
import { User } from 'src/common/decorators/user.decorator'
import { ProductsService } from './products.service'

@Roles(UserRole.MERCHANT)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('all')
  get() {
    return 'api to get all products'
  }

  @Post('create')
  create(
    @Body() createProductDto: CreateProductDto,
    @User('userId') userId: number,
  ) {
    return this.productsService.createProduct(createProductDto, userId)
  }
}
