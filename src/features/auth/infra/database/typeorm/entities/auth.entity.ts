import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';

@Entity({ schema: 'user_schema', name: 'auth' })
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'uuid' })
  user_uuid: string;

  @CreateDateColumn({ type: 'timestamp' })
  initial_date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  final_date: Date;

  @Column()
  token: string;

  @Column()
  ip_address: string;

  @Column()
  auth_type: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.auth)
  @JoinColumn({ name: 'user_uuid' })
  user: UserEntity;
}
