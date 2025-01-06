import { Application } from '@/common/application/application';
import { Inject, Injectable } from '@nestjs/common';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { IProductListService } from '@/features/product/domain/services/product-list.service';
import { IProductListUseCase } from '@/features/product/domain/use-cases/product-list.use-case';
import { Product } from '@/features/product/domain/entities/product';
import { IProductSearchParamsDto } from '@/features/product/domain/dto/product-search-params.dto';

@Injectable()
export class ProductListService
  extends Application
  implements IProductListService
{
  constructor(
    @Inject(IProductListUseCase)
    private readonly productListUseCase: IProductListUseCase,
  ) {
    super();
  }

  async handle(
    productSearchParamsDto: IProductSearchParamsDto,
  ): Promise<Product[]> {
    this.policy.can(AbilitiesEnum.PRODUCTS_VIEW);

    return await this.productListUseCase.execute(productSearchParamsDto);
  }
}
