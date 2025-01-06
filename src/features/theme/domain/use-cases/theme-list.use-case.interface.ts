import { Theme } from '@/features/theme/domain/entities/theme';
import { ThemeSearchParamsDto } from '@/features/theme/application/dto/theme-search-params.dto';

export interface IThemeListUseCase {
  execute(themeSearchParamsDto: ThemeSearchParamsDto): Promise<Theme[]>;
}

export const IThemeListUseCase = Symbol('IThemeListUseCase');
