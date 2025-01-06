import { ProductCreateDto } from '@/features/product/application/dto/product-create.dto';
import { IProductUpdateDto } from '@/features/product/domain/dto/product-update.dto';

export class ProductUpdateDto
  extends ProductCreateDto
  implements IProductUpdateDto {}
