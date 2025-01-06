import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { ThemeCreateDto } from '@/features/theme/application/dto/theme-create.dto';
import { IThemeUpdateDto } from '@/features/theme/domain/dto/theme-update.dto.interface';

export class ThemeUpdateDto extends ThemeCreateDto implements IThemeUpdateDto {
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  categoriesUuid?: string[] = [];
}
