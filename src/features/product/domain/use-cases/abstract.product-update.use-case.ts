import { Product } from '@/features/product/domain/core/product';
import { ProductUpdateDto } from '@/features/product/application/dto/product-update.dto';

export abstract class AbstractProductUpdateUseCase {
  abstract execute(
    uuid: string,
    productUpdateDto: ProductUpdateDto,
  ): Promise<Product>;
}
