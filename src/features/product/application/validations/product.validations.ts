import { Product } from '@/features/product/domain/core/product';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';

export class ProductValidations {
  static async productExists(
    uuid: string,
    productQueryRepository: ProductQueryRepository,
  ): Promise<Product> {
    const product = await productQueryRepository.findByUuid(uuid);

    if (!product) {
      throw new NotFoundException(ErrorMessagesEnum.PRODUCT_NOT_FOUND);
    }

    return product;
  }
}
