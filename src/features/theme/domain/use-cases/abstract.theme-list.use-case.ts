import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Theme } from '@/features/theme/domain/core/theme';
import { ThemeSearchParamsDto } from '@/features/theme/application/dto/theme-search-params.dto';

export abstract class AbstractThemeListUseCase {
  abstract execute(
    themeSearchParamsDto: ThemeSearchParamsDto,
  ): Promise<ILengthAwarePaginator | Theme[]>;
}
