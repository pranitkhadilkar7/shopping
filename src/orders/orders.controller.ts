import { Body, Controller, Post } from '@nestjs/common'
import { OrderCreateDto } from './dtos/order-create.dto'
import { Roles } from '../common/decorators/roles.decorator'
import { UserRole } from '../roles/role.enum'
import { User } from '../common/decorators/user.decorator'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}
  @Roles(UserRole.CONSUMER)
  @Post('create')
  create(
    @Body() orderCreateDto: OrderCreateDto,
    @User('userId') userId: number,
  ) {
    return this.ordersService.create(orderCreateDto, userId)
  }
}
