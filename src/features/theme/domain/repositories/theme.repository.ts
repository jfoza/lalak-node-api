import { ThemeSearchParams } from '@/features/theme/domain/core/theme-search-params';
import { Theme } from '@/features/theme/domain/core/theme';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';

export abstract class ThemeRepository {
  abstract findAll(themeSearchParams: ThemeSearchParams): Promise<Theme[]>;
  abstract paginate(
    themeSearchParams: ThemeSearchParams,
  ): Promise<ILengthAwarePaginator>;
  abstract findByUuid(uuid: string): Promise<Theme | null>;
  abstract findByName(description: string): Promise<Theme | null>;
  abstract create(theme: Theme): Promise<Theme>;
  abstract update(theme: Theme): Promise<Theme>;
  abstract remove(uuid: string): Promise<void>;
}
