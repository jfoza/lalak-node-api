import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from '@/features/product/infra/database/typeorm/entities/product.entity';

@Entity({ schema: 'general_schema', name: 'images' })
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  path: string;

  @Column()
  type: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToMany(() => ProductEntity, (product: ProductEntity) => product.images)
  products: ProductEntity[];
}
