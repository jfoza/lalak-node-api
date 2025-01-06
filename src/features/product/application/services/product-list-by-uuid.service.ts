import { Product } from '@/features/product/domain/entities/product';
import { Application } from '@/common/application/application';
import { Inject, Injectable } from '@nestjs/common';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { IProductListByUuidService } from '@/features/product/domain/services/product-list-by-uuid.service';
import { IProductListByUuidUseCase } from '@/features/product/domain/use-cases/product-list-by-uuid.use-case';

@Injectable()
export class ProductListByUuidService
  extends Application
  implements IProductListByUuidService
{
  constructor(
    @Inject(IProductListByUuidUseCase)
    private readonly productListByUuidUseCase: IProductListByUuidUseCase,
  ) {
    super();
  }

  async handle(uuid: string): Promise<Product> {
    this.policy.can(AbilitiesEnum.PRODUCTS_VIEW);

    return await this.productListByUuidUseCase.execute(uuid);
  }
}
