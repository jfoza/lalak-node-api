import { Product } from '@/features/product/domain/core/product';
import { ConflictException, NotFoundException } from '@nestjs/common';
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

  static async productExistsByName(
    name: string,
    productQueryRepository: ProductQueryRepository,
  ): Promise<void> {
    if (await productQueryRepository.findByName(name)) {
      throw new ConflictException(
        ErrorMessagesEnum.PRODUCT_NAME_ALREADY_EXISTS,
      );
    }
  }

  static async productExistsByNameInUpdate(
    uuid: string,
    name: string,
    productQueryRepository: ProductQueryRepository,
  ): Promise<void> {
    const product = await productQueryRepository.findByName(name);

    if (product && product.uuid !== uuid) {
      throw new ConflictException(
        ErrorMessagesEnum.PRODUCT_NAME_ALREADY_EXISTS,
      );
    }
  }
}
