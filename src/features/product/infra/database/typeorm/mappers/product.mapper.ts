import { ProductEntity } from '@/features/product/infra/database/typeorm/entities/product.entity';
import {
  Product,
  ProductProps,
} from '@/features/product/domain/entities/product';
import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { UniqueName } from '@/common/domain/value-objects/unique-name';

export class ProductMapper extends Mapper<ProductEntity, Product> {
  static get toDomain(): ProductMapper {
    return new this();
  }

  async from(raw: ProductEntity): Promise<Product> {
    const props: ProductProps = {
      description: raw.description,
      details: raw.details,
      uniqueName: UniqueName.create(raw.unique_name),
      value: raw.value,
      quantity: raw.quantity,
      balance: raw.balance,
      active: raw.active,
      createdAt: raw.created_at,
    };

    return Product.create(props, UniqueEntityId.create(raw.uuid));
  }
}
