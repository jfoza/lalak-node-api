import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Theme } from '@/features/theme/domain/core/theme';
import { ThemeSearchParamsDto } from '@/features/theme/application/dto/theme-search-params.dto';
import { AbstractThemeListUseCase } from '@/features/theme/domain/use-cases/abstract.theme-list.use-case';
import { PublicAbstractThemeListService } from '@/features/theme/domain/services/public.abstract.theme-list.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PublicThemeListService implements PublicAbstractThemeListService {
  constructor(private readonly themeListUseCase: AbstractThemeListUseCase) {}

  async handle(
    themeSearchParamsDto: ThemeSearchParamsDto,
  ): Promise<ILengthAwarePaginator | Theme[]> {
    return this.themeListUseCase.execute(themeSearchParamsDto);
  }
}
