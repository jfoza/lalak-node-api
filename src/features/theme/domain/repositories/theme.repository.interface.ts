import { Theme } from '@/features/theme/domain/entities/theme';
import { IThemeSearchParamsDto } from '@/features/theme/domain/dto/theme-search-params.dto.interface';

export interface ThemeRepository {
  findAll(themeSearchParams: IThemeSearchParamsDto): Promise<Theme[]>;
  findByUuid(uuid: string): Promise<Theme | null>;
  findByName(description: string): Promise<Theme | null>;
  create(theme: Theme): Promise<Theme>;
  update(theme: Theme): Promise<Theme>;
  remove(uuid: string): Promise<void>;
}

export const ThemeRepository = Symbol('ThemeRepository');
