import { ProductCommandRepository } from '@/features/product/domain/repositories/product-command.repository';
import { Product } from '@/features/product/domain/core/product';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '@/features/product/infra/database/typeorm/entities/product.entity';
import { Repository } from 'typeorm';

export class TypeormProductCommandRepository
  implements ProductCommandRepository
{
  @InjectRepository(ProductEntity)
  private readonly productEntityRepository: Repository<ProductEntity>;

  async create(product: Product): Promise<Product> {
    const productEntity = this.productEntityRepository.create({
      uuid: product.uuid,
      description: product.description,
      details: product.details,
      unique_name: product.uniqueName,
      value: product.value,
      quantity: product.quantity,
      balance: product.balance,
      active: product.active,
      created_at: product.createdAt,
    });

    await this.productEntityRepository.save(productEntity);

    return product;
  }

  async update(product: Product): Promise<Product> {
    await this.productEntityRepository.update(product.uuid, {
      description: product.description,
      details: product.details,
      unique_name: product.uniqueName,
      value: product.value,
      quantity: product.quantity,
      balance: product.balance,
    });

    return product;
  }

  async remove(uuid: string): Promise<void> {
    await this.productEntityRepository.delete(uuid);
  }

  async saveCategories(product: Product): Promise<void> {
    await this.productEntityRepository
      .createQueryBuilder()
      .relation(ProductEntity, 'categories')
      .of(product.uuid)
      .add(product.categoriesUuid);
  }

  async saveEvents(product: Product): Promise<void> {
    await this.productEntityRepository
      .createQueryBuilder()
      .relation(ProductEntity, 'events')
      .of(product.uuid)
      .add(product.eventsUuid);
  }

  async saveImages(product: Product): Promise<void> {
    return Promise.resolve(undefined);
  }
}
