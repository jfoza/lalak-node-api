import { CreateThemeDto } from '@/features/themes/application/dto/create-theme.dto';
import { IsArray, IsOptional, IsUUID } from 'class-validator';

export class UpdateThemeDto extends CreateThemeDto {
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  categoriesUuid?: string[] = [];
}
