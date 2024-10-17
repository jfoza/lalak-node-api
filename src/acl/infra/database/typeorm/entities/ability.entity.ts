import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProfileEntity } from '@/features/user/infra/database/typeorm/entities/profile.entity';

@Entity({ schema: 'user_schema', name: 'abilities' })
export class AbilityEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  description: string;

  @Column()
  subject: string;

  @Column()
  action: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToMany(
    () => ProfileEntity,
    (profile: ProfileEntity) => profile.abilities,
  )
  profiles: ProfileEntity[];
}
