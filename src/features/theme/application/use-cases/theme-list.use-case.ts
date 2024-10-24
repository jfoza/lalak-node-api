import { AbstractThemeListUseCase } from '@/features/theme/domain/use-cases/abstract.theme-list.use-case';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Theme } from '@/features/theme/domain/core/theme';
import { ThemeSearchParamsDto } from '@/features/theme/application/dto/theme-search-params.dto';
import {
  ThemeSearchParams,
  ThemeSearchParamsProps,
} from '@/features/theme/domain/core/theme-search-params';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository';
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

      return await this.themeRepository.paginate(themeSearchParams);
    }

    return await this.themeRepository.findAll(themeSearchParams);
  }
}
