import { AbstractThemeListUseCase } from '@/features/themes/domain/use-cases/abstract.theme-list.use-case';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Theme } from '@/features/themes/domain/core/theme';
import { ThemeSearchParamsDto } from '@/features/themes/application/dto/theme-search-params.dto';
import {
  ThemeSearchParams,
  ThemeSearchParamsProps,
} from '@/features/themes/domain/core/theme-search-params';
import { ThemeRepository } from '@/features/themes/domain/repositories/theme.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThemeListUseCase implements AbstractThemeListUseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async execute(
    themeSearchParamsDto: ThemeSearchParamsDto,
  ): Promise<ILengthAwarePaginator | Theme[]> {
    const { description, page, perPage, columnOrder, columnName } =
      themeSearchParamsDto;

    const themeSearchParams = ThemeSearchParams.create({
      description,
      columnOrder,
      columnName,
    } as ThemeSearchParamsProps);

    if (page) {
      themeSearchParams.page = page;
      themeSearchParams.perPage = perPage;

      return await this.themeRepository.paginateResults(themeSearchParams);
    }

    return await this.themeRepository.findAll(themeSearchParams);
  }
}
