import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '../users/user.entity'
import { Role } from '../roles/role.entity'
import { TokenType } from './token.enum'

@Entity({ name: 'verification_tokens' })
export class Token {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ name: 'expiry_date' })
  expiryDate: Date

  @Column({ name: 'email', nullable: true })
  email: string | null

  @Column({ name: 'token_type', type: 'enum', enum: TokenType })
  tokenType: TokenType

  @Column({ name: 'token', nullable: false, unique: true })
  token: string

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  createdBy: User

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  createdFor: User

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role
}
