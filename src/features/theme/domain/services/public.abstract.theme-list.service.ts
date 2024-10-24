import { ThemeSearchParamsDto } from '@/features/theme/application/dto/theme-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Theme } from '@/features/theme/domain/core/theme';

export abstract class PublicAbstractThemeListService {
  abstract handle(
    themeSearchParamsDto: ThemeSearchParamsDto,
  ): Promise<ILengthAwarePaginator | Theme[]>;
}
