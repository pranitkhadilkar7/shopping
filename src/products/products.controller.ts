import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { Roles } from 'src/common/decorators/roles.decorator'
import { UserRole } from 'src/roles/role.enum'
import { CreateProductDto } from './dtos/create-product.dto'
import { User } from 'src/common/decorators/user.decorator'
import { ProductsService } from './products.service'
import { EditProductDto } from './dtos/edit-product.dto'
import { ProductUpdateGuard } from './product-update.guard'

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
    return this.productsService.create(createProductDto, userId)
  }

  @UseGuards(ProductUpdateGuard)
  @Patch('edit/:id')
  async edit(
    @Body() editProductDto: EditProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.productsService.edit(id, editProductDto)
    return {
      message: 'Product updated successfully',
    }
  }
}
