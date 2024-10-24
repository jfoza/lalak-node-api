import { AbstractProductUpdateUseCase } from '@/features/product/domain/use-cases/abstract.product-update.use-case';
import { ProductUpdateDto } from '@/features/product/application/dto/product-update.dto';
import { Product } from '@/features/product/domain/core/product';
import { Injectable } from '@nestjs/common';
import { Application } from '@/common/application/use-cases/application';

@Injectable()
export class ProductUpdateUseCase
  extends Application
  implements AbstractProductUpdateUseCase
{
  async execute(productUpdateDto: ProductUpdateDto): Promise<Product> {
    return Promise.resolve(undefined);
  }
}
