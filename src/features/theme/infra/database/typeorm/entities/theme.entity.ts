import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '@/features/category/infra/database/typeorm/entities/category.entity';

@Entity({ schema: 'products_schema', name: 'themes' })
export class ThemeEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  description: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => CategoryEntity, (category: CategoryEntity) => category.theme)
  categories: CategoryEntity[];
}
