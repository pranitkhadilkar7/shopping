import { User } from 'src/users/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column({ name: 'name' })
  name: string

  @Column({ name: 'display_name' })
  displayName: string

  @Column({ name: 'description' })
  description: string

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string

  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: string

  @OneToOne(() => User)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  createdBy: User
}
