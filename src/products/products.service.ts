import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './product.entity'
import { Repository } from 'typeorm'
import { UsersService } from '../users/users.service'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepo: Repository<Product>,
    private usersService: UsersService,
  ) {}

  getProductAndMerchantById(id: number) {
    return this.productsRepo.findOne({
      where: { id },
      relations: { merchant: true },
    })
  }

  async create(productInfo: Partial<Product>, merchantId: number) {
    const product = this.productsRepo.create(productInfo)
    const merchant = await this.usersService.findById(merchantId)
    product.merchant = merchant
    return this.productsRepo.save(product)
  }

  editById(id: number, product: Partial<Product>) {
    return this.productsRepo.update({ id }, product)
  }

  deleteByProductId(id: number) {
    return this.productsRepo.delete({ id })
  }
}
