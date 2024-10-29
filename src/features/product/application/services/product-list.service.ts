import { AbstractProductListService } from '@/features/product/domain/services/abstract.product-list.service';
import { ProductSearchParamsDto } from '@/features/product/application/dto/product-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Application } from '@/common/application/use-cases/application';
import { Inject, Injectable } from '@nestjs/common';
import { AbstractProductListUseCase } from '@/features/product/domain/use-cases/abstract.product-list.use-case';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';

@Injectable()
export class ProductListService
  extends Application
  implements AbstractProductListService
{
  constructor(
    @Inject(AbstractProductListUseCase)
    private readonly productListUseCase: AbstractProductListUseCase,
  ) {
    super();
  }

  async handle(
    productSearchParamsDto: ProductSearchParamsDto,
  ): Promise<ILengthAwarePaginator> {
    this.policy.can(AbilitiesEnum.PRODUCTS_VIEW);

    return await this.productListUseCase.execute(productSearchParamsDto);
  }
}
