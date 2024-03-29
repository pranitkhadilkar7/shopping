import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { Roles } from '../common/decorators/roles.decorator'
import { UserRole } from '../roles/role.enum'
import { CreateProductDto } from './dtos/create-product.dto'
import { User } from '../common/decorators/user.decorator'
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
    await this.productsService.editById(id, editProductDto)
    return {
      message: 'Product updated successfully',
    }
  }

  @UseGuards(ProductUpdateGuard)
  @Delete('delete/:id')
  async deleteByProductId(@Param('id', ParseIntPipe) id: number) {
    await this.productsService.deleteByProductId(id)
    return {
      message: 'product deleted successfully',
    }
  }
}
