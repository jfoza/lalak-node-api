import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ThemeEntity } from '@/features/theme/infra/database/typeorm/entities/theme.entity';
import { ProductEntity } from '@/features/product/infra/database/typeorm/entities/product.entity';

@Entity({ schema: 'products_schema', name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'uuid' })
  theme_uuid: string;

  @Column()
  description: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => ThemeEntity, (theme: ThemeEntity) => theme.categories)
  @JoinColumn({ name: 'theme_uuid' })
  theme: ThemeEntity;

  @ManyToMany(
    () => ProductEntity,
    (product: ProductEntity) => product.categories,
  )
  products: ProductEntity[];
}
