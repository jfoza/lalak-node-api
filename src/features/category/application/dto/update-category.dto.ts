import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { CreateCategoryDto } from '@/features/category/application/dto/create-category.dto';

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  productsUuid?: string[] = [];
}
