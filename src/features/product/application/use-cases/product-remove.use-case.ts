import { Inject, Injectable } from '@nestjs/common';
import { Application } from '@/common/application/application';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { ProductValidations } from '@/features/product/application/validations/product.validations';
import { ProductCommandRepository } from '@/features/product/domain/repositories/product-command.repository';
import { IProductRemoveUseCase } from '@/features/product/domain/use-cases/product-remove.use-case';

@Injectable()
export class ProductRemoveUseCase
  extends Application
  implements IProductRemoveUseCase
{
  constructor(
    @Inject(ProductQueryRepository)
    private readonly productQueryRepository: ProductQueryRepository,

    @Inject(ProductCommandRepository)
    private readonly productCommandRepository: ProductCommandRepository,
  ) {
    super();
  }

  async execute(uuid: string): Promise<void> {
    this.policy.can(AbilitiesEnum.PRODUCTS_DELETE);

    const product = await ProductValidations.productExists(
      uuid,
      this.productQueryRepository,
    );

    await this.productCommandRepository.remove(product.uuid);
  }
}
