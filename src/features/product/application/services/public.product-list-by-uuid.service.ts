import { Inject, Injectable } from '@nestjs/common';
import { AbstractProductListUseCase } from '@/features/product/domain/use-cases/abstract.product-list.use-case';
import { AbstractProductListByUuidUseCase } from '@/features/product/domain/use-cases/abstract.product-list-by-uuid.use-case';
import { AbstractPublicProductListByUuidService } from '@/features/product/domain/services/abstract.public.product-list-by-uuid.service';
import { Product } from '@/features/product/domain/core/product';

@Injectable()
export class PublicProductListByUuidService
  implements AbstractPublicProductListByUuidService
{
  constructor(
    @Inject(AbstractProductListUseCase)
    private readonly productListByUuidUseCase: AbstractProductListByUuidUseCase,
  ) {}

  async handle(uuid: string): Promise<Product> {
    return await this.productListByUuidUseCase.execute(uuid);
  }
}
