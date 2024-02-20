import { Product } from 'src/products/product.entity'
import { User } from 'src/users/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @CreateDateColumn({ name: 'date', default: () => 'CURRENT_TIMESTAMP' })
  date: string

  @Column({ name: 'quantity' })
  quantity: number

  @Column({ name: 'price' })
  price: number

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product

  @ManyToOne(() => User)
  @JoinColumn({ name: 'consumer_id', referencedColumnName: 'id' })
  consumer: User

  @ManyToOne(() => User)
  @JoinColumn({ name: 'merchant_id', referencedColumnName: 'id' })
  merchant: User
}
