import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from './order.entity'
import { Repository } from 'typeorm'
import { OrderCreateDto } from './dtos/order-create.dto'
import { ProductsService } from '../products/products.service'
import { UsersService } from '../users/users.service'
import { Product } from '../products/product.entity'
import { User } from '../users/user.entity'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
    private productsService: ProductsService,
    private usersService: UsersService,
  ) {}

  async create(productInfo: OrderCreateDto, consumerId: number) {
    const product = await this.productsService.getProductAndMerchantById(
      productInfo.productId,
    )
    const consumer = await this.usersService.findById(consumerId, {
      roles: true,
      merchants: true,
      consumers: true,
    })

    if (!product) {
      throw new BadRequestException('Product does not exist')
    }
    if (!this.isProductBelongToConsumer(product, consumer)) {
      throw new UnauthorizedException(
        `You don't have enough previlege to order this product`,
      )
    }
    if (product.quantity < productInfo.productQuantity) {
      throw new BadRequestException(
        `Only ${product.quantity} products can be ordered`,
      )
    }

    const order = this.ordersRepo.create({
      quantity: productInfo.productQuantity,
      price: product.price * productInfo.productQuantity,
      product: product,
      merchant: product.merchant,
      consumer: consumer,
    })

    const savedOrder = await this.ordersRepo.save(order)

    try {
      await this.productsService.editById(productInfo.productId, {
        quantity: product.quantity - productInfo.productQuantity,
      })
    } catch {
      await this.deleteOrderById(savedOrder.id)
      throw new HttpException(
        'Order can not be created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }

    return {
      order: {
        id: savedOrder.id,
        date: savedOrder.date,
        price: savedOrder.price,
        quantity: savedOrder.quantity,
      },
      merchant: savedOrder.merchant,
    }
  }

  deleteOrderById(id: number) {
    return this.ordersRepo.delete({ id })
  }

  isProductBelongToConsumer(product: Product, consumer: User) {
    return consumer.merchants.find(
      (merchant) => merchant.id === product?.merchant?.id,
    )
  }
}
