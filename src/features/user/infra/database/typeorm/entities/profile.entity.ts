import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';
import { AbilityEntity } from '@/acl/infra/database/typeorm/entities/ability.entity';

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

  @JoinTable({
    schema: 'user_schema',
    name: 'profiles_abilities',
    joinColumn: {
      name: 'profile_uuid',
      referencedColumnName: 'uuid',
    },
    inverseJoinColumn: {
      name: 'ability_uuid',
      referencedColumnName: 'uuid',
    },
  })
  @ManyToMany(
    () => AbilityEntity,
    (ability: AbilityEntity) => ability.profiles,
    {
      cascade: true,
    },
  )
  abilities: AbilityEntity[];
}
