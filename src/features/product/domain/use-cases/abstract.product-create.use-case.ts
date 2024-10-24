import { Product } from '@/features/product/domain/core/product';
import { ProductCreateDto } from '@/features/product/application/dto/product-create.dto';

export abstract class AbstractProductCreateUseCase {
  abstract execute(productCreateDto: ProductCreateDto): Promise<Product>;
}
