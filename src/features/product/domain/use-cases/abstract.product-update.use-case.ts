import { Product } from '@/features/product/domain/core/product';
import { ProductUpdateDto } from '@/features/product/application/dto/product-update.dto';

export abstract class AbstractProductUpdateUseCase {
  abstract execute(productUpdateDto: ProductUpdateDto): Promise<Product>;
}
