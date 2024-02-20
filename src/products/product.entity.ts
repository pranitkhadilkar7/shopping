import { User } from 'src/users/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column({ name: 'name' })
  name: string

  @Column({ name: 'description' })
  description: string

  @Column({ name: 'model' })
  model: string

  @Column({ name: 'model_year' })
  modelYear: string

  @Column({ name: 'price' })
  price: number

  @Column({ name: 'size' })
  size: string

  @Column({ name: 'quantity' })
  quantity: number

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string

  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: string

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'merchant_id', referencedColumnName: 'id' })
  merchant: User
}
