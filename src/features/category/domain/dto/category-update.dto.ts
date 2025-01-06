import { ICategoryCreateDto } from '@/features/category/domain/dto/category-create.dto';

export interface ICategoryUpdateDto extends ICategoryCreateDto {
  productsUuid?: string[];
}
