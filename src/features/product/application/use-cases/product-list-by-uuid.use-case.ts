import { Product } from '@/features/product/domain/entities/product';
import { Inject, Injectable } from '@nestjs/common';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';
import { ProductValidations } from '@/features/product/application/validations/product.validations';
import { IProductListByUuidUseCase } from '@/features/product/domain/use-cases/product-list-by-uuid.use-case';

@Injectable()
export class ProductListByUuidUseCase implements IProductListByUuidUseCase {
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
