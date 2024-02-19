import {
  Column,
  CreateDateColumn,
  Entity,
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
}
