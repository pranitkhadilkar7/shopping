import { Exclude } from 'class-transformer'
import { Product } from '../products/product.entity'
import { Role } from '../roles/role.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column({ name: 'username' })
  username: string

  @Column({ name: 'email' })
  email: string

  @Column({ name: 'password' })
  @Exclude()
  password: string

  @Column({ name: 'phoneno' })
  phoneno: string

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string

  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: string

  @Column({ name: 'created_by', default: null })
  createdBy: number | null

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[]

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({
    name: 'consumers_merchants',
    joinColumn: { name: 'consumer_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'merchant_id', referencedColumnName: 'id' },
  })
  merchants: User[]

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({
    name: 'consumers_merchants',
    joinColumn: { name: 'merchant_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'consumer_id', referencedColumnName: 'id' },
  })
  consumers: User[]

  @OneToMany(() => Product, (product) => product.merchant)
  products: Product[]
}
