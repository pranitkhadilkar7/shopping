import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common'
import { Request } from 'express'
import { UserPayload } from 'src/common/types/user-payload.type'
import { ProductsService } from './products.service'

@Injectable()
export class ProductUpdateGuard implements CanActivate {
  constructor(private productsService: ProductsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request<{ id: string }> & UserPayload>()
    const userId = request.userId
    const productId = request?.params?.id
    if (userId && productId) {
      const product = await this.productsService.getProductAndMerchantById(
        parseInt(productId),
      )
      if (!product) {
        throw new BadRequestException('Product does not exist')
      }
      return product.merchant.id === userId
    }
    return false
  }
}
