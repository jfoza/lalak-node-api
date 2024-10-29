import { Mapper } from '@/common/infra/database/typeorm/mappers/Mapper';
import { ProductEntity } from '@/features/product/infra/database/typeorm/entities/product.entity';
import { Product, ProductProps } from '@/features/product/domain/core/product';

export class ProductMapper extends Mapper<
  ProductEntity,
  Product,
  ProductProps
> {
  protected snakeCaseMapper: boolean = true;

  protected async toDomainEntity(
    props: ProductProps,
    uuid: string,
  ): Promise<Product> {
    return await Product.create(props, uuid);
  }
}
