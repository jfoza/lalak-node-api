import { Theme } from '@/features/theme/domain/entities/theme';
import { IThemeSearchParamsDto } from '@/features/theme/domain/dto/theme-search-params.dto.interface';

export interface IPublicThemeListService {
  handle(themeSearchParamsDto: IThemeSearchParamsDto): Promise<Theme[]>;
}

export const IPublicThemeListService = Symbol('IPublicThemeListService');
