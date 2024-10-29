import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '@/features/category/infra/database/typeorm/entities/category.entity';
import { EventEntity } from '@/features/event/infra/database/typeorm/entities/event.entity';

@Entity({ schema: 'products_schema', name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  description: string;

  @Column()
  details: string;

  @Column()
  unique_name: string;

  @Column()
  value: number;

  @Column()
  quantity: number;

  @Column()
  balance: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @JoinTable({
    schema: 'products_schema',
    name: 'products_categories',
    joinColumn: {
      name: 'product_uuid',
      referencedColumnName: 'uuid',
    },
    inverseJoinColumn: {
      name: 'category_uuid',
      referencedColumnName: 'uuid',
    },
  })
  @ManyToMany(
    () => CategoryEntity,
    (category: CategoryEntity) => category.products,
  )
  categories: CategoryEntity[];

  @JoinTable({
    schema: 'products_schema',
    name: 'products_events',
    joinColumn: {
      name: 'product_uuid',
      referencedColumnName: 'uuid',
    },
    inverseJoinColumn: {
      name: 'event_uuid',
      referencedColumnName: 'uuid',
    },
  })
  @ManyToMany(() => EventEntity, (event: EventEntity) => event.products)
  events: EventEntity[];
}
