import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PersonEntity } from '@/features/user/infra/database/typeorm/entities/person.entity';

@Entity({ schema: 'city_schema', name: 'cities' })
export class CityEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  description: string;

  @Column()
  uf: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => PersonEntity, (persons) => persons.city)
  persons: PersonEntity[];
}
