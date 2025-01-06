import { Product } from '@/features/product/domain/entities/product';
import { IProductUpdateDto } from '@/features/product/domain/dto/product-update.dto';

export interface IProductUpdateUseCase {
  execute(uuid: string, productUpdateDto: IProductUpdateDto): Promise<Product>;
}

export const IProductUpdateUseCase = Symbol('IProductUpdateUseCase');
