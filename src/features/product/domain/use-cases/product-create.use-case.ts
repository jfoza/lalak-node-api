import { Product } from '@/features/product/domain/entities/product';
import { IProductCreateDto } from '@/features/product/domain/dto/product-create.dto';

export interface IProductCreateUseCase {
  execute(productCreateDto: IProductCreateDto): Promise<Product>;
}

export const IProductCreateUseCase = Symbol('IProductCreateUseCase');
