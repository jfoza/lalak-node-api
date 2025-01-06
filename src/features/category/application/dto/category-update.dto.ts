import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { CategoryCreateDto } from '@/features/category/application/dto/category-create.dto';
import { ICategoryUpdateDto } from '@/features/category/domain/dto/category-update.dto';

export class CategoryUpdateDto
  extends CategoryCreateDto
  implements ICategoryUpdateDto
{
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  productsUuid?: string[] = [];
}
