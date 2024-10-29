import { ProductSearchParamsDto } from '@/features/product/application/dto/product-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Inject, Injectable } from '@nestjs/common';
import { AbstractProductListUseCase } from '@/features/product/domain/use-cases/abstract.product-list.use-case';
import { AbstractPublicProductListService } from '@/features/product/domain/services/abstract.public.product-list.service';

@Injectable()
export class PublicProductListService
  implements AbstractPublicProductListService
{
  constructor(
    @Inject(AbstractProductListUseCase)
    private readonly productListUseCase: AbstractProductListUseCase,
  ) {}

  async handle(
    productSearchParamsDto: ProductSearchParamsDto,
  ): Promise<ILengthAwarePaginator> {
    return await this.productListUseCase.execute(productSearchParamsDto);
  }
}
