import { Product } from '@/features/product/domain/entities/product';
import { IProductUpdateDto } from '@/features/product/domain/dto/product-update.dto';

export interface IProductUpdateService {
  handle(uuid: string, productUpdateDto: IProductUpdateDto): Promise<Product>;
}

export const IProductUpdateService = Symbol('IProductUpdateService');
