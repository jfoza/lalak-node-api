import { Inject, Injectable } from '@nestjs/common';
import { Product } from '@/features/product/domain/entities/product';
import { IPublicProductListByUuidService } from '@/features/product/domain/services/public.product-list-by-uuid.service';
import { IProductListByUuidUseCase } from '@/features/product/domain/use-cases/product-list-by-uuid.use-case';

@Injectable()
export class PublicProductListByUuidService
  implements IPublicProductListByUuidService
{
  constructor(
    @Inject(IProductListByUuidUseCase)
    private readonly productListByUuidUseCase: IProductListByUuidUseCase,
  ) {}

  async handle(uuid: string): Promise<Product> {
    return await this.productListByUuidUseCase.execute(uuid);
  }
}
