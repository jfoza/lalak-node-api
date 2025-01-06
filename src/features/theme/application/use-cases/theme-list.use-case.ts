import { Theme } from '@/features/theme/domain/entities/theme';
import { Inject, Injectable } from '@nestjs/common';
import { IThemeListUseCase } from '@/features/theme/domain/use-cases/theme-list.use-case.interface';
import { IThemeSearchParamsDto } from '@/features/theme/domain/dto/theme-search-params.dto.interface';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository.interface';

@Injectable()
export class ThemeListUseCase implements IThemeListUseCase {
  constructor(
    @Inject(ThemeRepository)
    private readonly themeRepository: ThemeRepository,
  ) {}

  async execute(themeSearchParamsDto: IThemeSearchParamsDto): Promise<Theme[]> {
    // const { page } = themeSearchParamsDto.paginationOrder;
    //
    // if (page) {
    //   return await this.themeRepository.paginate(themeSearchParamsDto);
    // }

    return await this.themeRepository.findAll(themeSearchParamsDto);
  }
}
