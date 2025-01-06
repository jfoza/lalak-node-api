import { IThemeCreateDto } from '@/features/theme/domain/dto/theme-create.dto.interface';

export interface IThemeUpdateDto extends IThemeCreateDto {
  categoriesUuid?: string[];
}
