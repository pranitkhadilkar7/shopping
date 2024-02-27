import { Module } from '@nestjs/common'
import { AuthModule } from '../../auth/auth.module'
import { UsersModule } from '../../users/users.module'
import { RolesModule } from '../../roles/roles.module'
import { ProductsModule } from '../../products/products.module'
import { OrdersModule } from '../../orders/orders.module'

@Module({
  imports: [AuthModule, UsersModule, RolesModule, ProductsModule, OrdersModule],
})
export class ApplicationModule {}
