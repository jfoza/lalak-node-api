import { ThemeSearchParams } from '@/features/themes/domain/core/theme-search-params';
import { Theme } from '@/features/themes/domain/core/theme';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';

export abstract class ThemeRepository {
  abstract findAll(themeSearchParams: ThemeSearchParams): Promise<Theme[]>;
  abstract paginateResults(
    themeSearchParams: ThemeSearchParams,
  ): Promise<ILengthAwarePaginator>;
  abstract findByUuid(uuid: string): Promise<Theme | null>;
  abstract findByName(description: string): Promise<Theme | null>;
  abstract create(theme: Theme): Promise<Theme>;
  abstract update(theme: Theme): Promise<Theme>;
  abstract remove(uuid: string): Promise<void>;
}
