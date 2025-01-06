import { Theme } from '@/features/theme/domain/entities/theme';
import { IThemeSearchParamsDto } from '@/features/theme/domain/dto/theme-search-params.dto.interface';

export interface IThemeListService {
  handle(themeSearchParamsDto: IThemeSearchParamsDto): Promise<Theme[]>;
}

export const IThemeListService = Symbol('IThemeListService');
