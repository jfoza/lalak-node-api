import { Product } from '@/features/product/domain/entities/product';
import { IProductCreateDto } from '@/features/product/domain/dto/product-create.dto';

export interface IProductCreateService {
  handle(productCreateDto: IProductCreateDto): Promise<Product>;
}

export const IProductCreateService = Symbol('IProductCreateService');
