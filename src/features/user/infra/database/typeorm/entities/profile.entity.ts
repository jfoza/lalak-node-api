import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';

@Entity({ schema: 'user_schema', name: 'profiles' })
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  description: string;

  @Column()
  unique_name: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => UserEntity, (user) => user.profile)
  users: UserEntity[];
}
