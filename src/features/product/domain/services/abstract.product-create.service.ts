import { Product } from '@/features/product/domain/core/product';
import { ProductCreateDto } from '@/features/product/application/dto/product-create.dto';
import { FileDto } from '@/upload/application/dto/file.dto';

export abstract class AbstractProductCreateService {
  abstract handle(
    productCreateDto: ProductCreateDto,
    image?: FileDto,
  ): Promise<Product>;
}
