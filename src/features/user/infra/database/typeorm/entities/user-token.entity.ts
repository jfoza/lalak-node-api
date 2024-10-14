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

@Entity({ schema: 'user_schema', name: 'user_tokens' })
export class UserTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('uuid')
  user_uuid: string;

  @Column('uuid')
  token: string;

  @Column('uuid')
  token_type: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.user_tokens)
  @JoinColumn({ name: 'user_uuid' })
  user: UserEntity;
}
