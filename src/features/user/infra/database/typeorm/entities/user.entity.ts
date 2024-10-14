import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthEntity } from '@/features/auth/infra/database/typeorm/entities/auth.entity';
import { ProfileEntity } from '@/features/user/infra/database/typeorm/entities/profile.entity';
import { PersonEntity } from '@/features/user/infra/database/typeorm/entities/person.entity';
import { AdminUserEntity } from '@/features/user/infra/database/typeorm/entities/admin-user.entity';
import { CustomerEntity } from '@/features/customer/infra/database/typeorm/entities/customer.entity';
import { UserTokenEntity } from '@/features/user/infra/database/typeorm/entities/user-token.entity';

@Entity({ schema: 'user_schema', name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'uuid' })
  person_uuid: string;

  @Column({ type: 'uuid' })
  profile_uuid: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => ProfileEntity, (profile) => profile.users)
  @JoinColumn({ name: 'profile_uuid' })
  profile: ProfileEntity;

  @OneToOne(() => PersonEntity, (person) => person.user)
  @JoinColumn({ name: 'person_uuid' })
  person: PersonEntity;

  @OneToOne(
    () => AdminUserEntity,
    (admin_user: AdminUserEntity) => admin_user.user,
  )
  admin_user: AdminUserEntity;

  @OneToOne(() => CustomerEntity, (customer: CustomerEntity) => customer.user)
  customer: CustomerEntity;

  @OneToMany(() => AuthEntity, (auth: AuthEntity) => auth.user)
  auth: AuthEntity[];

  @OneToMany(() => UserTokenEntity, (token: UserTokenEntity) => token.user)
  user_tokens: UserTokenEntity[];
}
