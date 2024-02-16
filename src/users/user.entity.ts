import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column({ name: 'username' })
  username: string

  @Column({ name: 'email' })
  email: string

  @Column({ name: 'password' })
  password: string

  @Column({ name: 'phoneno' })
  phoneno: string

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string

  @Column({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: string
}
