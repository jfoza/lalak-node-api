import { AbstractProductListByUuidUseCase } from '@/features/product/domain/use-cases/abstract.product-list-by-uuid.use-case';
import { Product } from '@/features/product/domain/core/product';
import { Inject, Injectable } from '@nestjs/common';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';
import { ProductValidations } from '@/features/product/application/validations/product.validations';

@Injectable()
export class ProductListByUuidUseCase
  implements AbstractProductListByUuidUseCase
{
  constructor(
    @Inject(ProductQueryRepository)
    private readonly productQueryRepository: ProductQueryRepository,
  ) {}

  async execute(uuid: string): Promise<Product> {
    return await ProductValidations.productExists(
      uuid,
      this.productQueryRepository,
    );
  }
}
