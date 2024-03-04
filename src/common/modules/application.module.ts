import { Module } from '@nestjs/common'
import { AuthModule } from '../../auth/auth.module'
import { UsersModule } from '../../users/users.module'
import { RolesModule } from '../../roles/roles.module'
import { ProductsModule } from '../../products/products.module'
import { OrdersModule } from '../../orders/orders.module'
import { TokensModule } from '../../tokens/tokens.module'
import { SchedulerModule } from '../../scheduler/scheduler.module'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    ProductsModule,
    OrdersModule,
    TokensModule,
    SchedulerModule,
  ],
})
export class ApplicationModule {}
