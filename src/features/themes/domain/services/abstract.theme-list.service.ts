import { ThemeSearchParamsDto } from '@/features/themes/application/dto/theme-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Theme } from '@/features/themes/domain/core/theme';

export abstract class AbstractThemeListService {
  abstract handle(
    themeSearchParamsDto: ThemeSearchParamsDto,
  ): Promise<ILengthAwarePaginator | Theme[]>;
}
