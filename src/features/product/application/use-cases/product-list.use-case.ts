import { ProductSearchParamsDto } from '@/features/product/application/dto/product-search-params.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';
import { Product } from '@/features/product/domain/entities/product';
import { IProductListUseCase } from '@/features/product/domain/use-cases/product-list.use-case';

@Injectable()
export class ProductListUseCase implements IProductListUseCase {
  constructor(
    @Inject(ProductQueryRepository)
    private readonly productQueryRepository: ProductQueryRepository,
  ) {}

  async execute(
    productSearchParamsDto: ProductSearchParamsDto,
  ): Promise<Product[]> {
    return await this.productQueryRepository.findAll(productSearchParamsDto);
  }
}
