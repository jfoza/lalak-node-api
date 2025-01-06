import { Theme } from '@/features/theme/domain/entities/theme';
import { Inject, Injectable } from '@nestjs/common';
import { IThemeListUseCase } from '@/features/theme/domain/use-cases/theme-list.use-case.interface';
import { IThemeSearchParamsDto } from '@/features/theme/domain/dto/theme-search-params.dto.interface';
import { IPublicThemeListService } from '@/features/theme/domain/services/public.theme-list.service';

@Injectable()
export class PublicThemeListService implements IPublicThemeListService {
  constructor(
    @Inject(IThemeListUseCase)
    private readonly themeListUseCase: IThemeListUseCase,
  ) {}

  async handle(themeSearchParamsDto: IThemeSearchParamsDto): Promise<Theme[]> {
    return this.themeListUseCase.execute(themeSearchParamsDto);
  }
}
