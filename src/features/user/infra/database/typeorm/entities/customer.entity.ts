import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';

@Entity({ schema: 'user_schema', name: 'customers' })
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('uuid')
  user_uuid: string;

  @Column({ type: 'boolean', default: false })
  verified_email: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToOne(() => UserEntity, (user) => user.customer)
  @JoinColumn({ name: 'user_uuid' })
  user: UserEntity;
}
