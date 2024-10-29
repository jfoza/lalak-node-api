import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from '@/features/product/infra/database/typeorm/entities/product.entity';

@Entity({ schema: 'products_schema', name: 'events' })
export class EventEntity {
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

  @ManyToMany(() => ProductEntity, (product: ProductEntity) => product.events)
  products: ProductEntity[];
}
