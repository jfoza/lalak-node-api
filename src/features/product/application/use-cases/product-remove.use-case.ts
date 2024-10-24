import { AbstractProductRemoveUseCase } from '@/features/product/domain/use-cases/abstract.product-remove.use-case';
import { Inject, Injectable } from '@nestjs/common';
import { Application } from '@/common/application/use-cases/application';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { ProductValidations } from '@/features/product/application/validations/product.validations';
import { ProductCommandRepository } from '@/features/product/domain/repositories/product-command.repository';

@Injectable()
export class ProductRemoveUseCase
  extends Application
  implements AbstractProductRemoveUseCase
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
    this.policy.can(AbilitiesEnum.PRODUCTS_VIEW);

    const product = await ProductValidations.productExists(
      uuid,
      this.productQueryRepository,
    );

    await this.productCommandRepository.remove(product.uuid);
  }
}
