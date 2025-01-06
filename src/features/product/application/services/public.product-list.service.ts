import { ProductSearchParamsDto } from '@/features/product/application/dto/product-search-params.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IPublicProductListService } from '@/features/product/domain/services/public.product-list.service';
import { IProductListUseCase } from '@/features/product/domain/use-cases/product-list.use-case';
import { Product } from '@/features/product/domain/entities/product';

@Injectable()
export class PublicProductListService implements IPublicProductListService {
  constructor(
    @Inject(IProductListUseCase)
    private readonly productListUseCase: IProductListUseCase,
  ) {}

  async handle(
    productSearchParamsDto: ProductSearchParamsDto,
  ): Promise<Product[]> {
    return await this.productListUseCase.execute(productSearchParamsDto);
  }
}
