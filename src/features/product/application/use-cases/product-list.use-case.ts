import { AbstractProductListUseCase } from '@/features/product/domain/use-cases/abstract.product-list.use-case';
import { ProductSearchParamsDto } from '@/features/product/application/dto/product-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Product } from '@/features/product/domain/core/product';
import { Inject, Injectable } from '@nestjs/common';
import { ProductSearchParams } from '@/features/product/domain/core/product-search-params';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';

@Injectable()
export class ProductListUseCase implements AbstractProductListUseCase {
  constructor(
    @Inject(ProductQueryRepository)
    private readonly productQueryRepository: ProductQueryRepository,
  ) {}

  async execute(
    productSearchParamsDto: ProductSearchParamsDto,
  ): Promise<ILengthAwarePaginator | Product[]> {
    const {
      description,
      userUuid,
      categories,
      events,
      active,
      page,
      perPage,
      columnOrder,
      columnName,
    } = productSearchParamsDto;

    const productSearchParams = ProductSearchParams.create({
      description,
      userUuid,
      categories,
      events,
      active,
      columnOrder,
      columnName,
    });

    if (page) {
      productSearchParams.page = page;
      productSearchParams.perPage = perPage;

      return await this.productQueryRepository.paginate(productSearchParams);
    }

    return await this.productQueryRepository.findAll(productSearchParams);
  }
}
