import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';
import { CityEntity } from '@/features/city/infra/database/typeorm/entities/city.entity';

@Entity({ schema: 'person_schema', name: 'persons' })
export class PersonEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  short_name: string;

  @CreateDateColumn({ type: 'date' })
  birth_date: Date;

  @Column()
  zip_code: string;

  @Column()
  address: string;

  @Column()
  number_address: string;

  @Column()
  complement: string;

  @Column()
  district: string;

  @Column()
  uf: string;

  @Column('uuid')
  city_uuid: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToOne(() => UserEntity, (user) => user.person)
  user: UserEntity;

  @ManyToOne(() => CityEntity, (city) => city.persons)
  @JoinColumn({ name: 'city_uuid' })
  city: CityEntity;
}
