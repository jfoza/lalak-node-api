import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ICategoryCreateDto } from '@/features/category/domain/dto/category-create.dto';

export class CategoryCreateDto implements ICategoryCreateDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  themeUuid: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
