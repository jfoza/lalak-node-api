import { AbstractProductListByUuidService } from '@/features/product/domain/services/abstract.product-list-by-uuid.service';
import { Product } from '@/features/product/domain/core/product';
import { Application } from '@/common/application/use-cases/application';
import { Inject, Injectable } from '@nestjs/common';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { AbstractProductListByUuidUseCase } from '@/features/product/domain/use-cases/abstract.product-list-by-uuid.use-case';

@Injectable()
export class ProductListByUuidService
  extends Application
  implements AbstractProductListByUuidService
{
  constructor(
    @Inject(AbstractProductListByUuidUseCase)
    private readonly productListByUuidUseCase: AbstractProductListByUuidUseCase,
  ) {
    super();
  }

  async handle(uuid: string): Promise<Product> {
    this.policy.can(AbilitiesEnum.PRODUCTS_VIEW);

    return await this.productListByUuidUseCase.execute(uuid);
  }
}
