import { AbstractProductCreateUseCase } from '@/features/product/domain/use-cases/abstract.product-create.use-case';
import { ProductCreateDto } from '@/features/product/application/dto/product-create.dto';
import { Product } from '@/features/product/domain/core/product';
import { Inject, Injectable } from '@nestjs/common';
import { Application } from '@/common/application/use-cases/application';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';
import { ProductCommandRepository } from '@/features/product/domain/repositories/product-command.repository';

@Injectable()
export class ProductCreateUseCase
  extends Application
  implements AbstractProductCreateUseCase
{
  constructor(
    @Inject(ProductQueryRepository)
    private readonly productQueryRepository: ProductQueryRepository,

    @Inject(ProductCommandRepository)
    private readonly productCommandRepository: ProductCommandRepository,
  ) {
    super();
  }

  async execute(productCreateDto: ProductCreateDto): Promise<Product> {
    return Promise.resolve(undefined);
  }
}
