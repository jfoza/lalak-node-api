import { Application } from '@/common/application/application';
import { Theme } from '@/features/theme/domain/entities/theme';
import { ThemeSearchParamsDto } from '@/features/theme/application/dto/theme-search-params.dto';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { Injectable } from '@nestjs/common';
import { IThemeListUseCase } from '@/features/theme/domain/use-cases/theme-list.use-case.interface';
import { IThemeListService } from '@/features/theme/domain/services/theme-list.service';

@Injectable()
export class ThemeListService extends Application implements IThemeListService {
  constructor(private readonly themeListUseCase: IThemeListUseCase) {
    super();
  }

  async handle(themeSearchParamsDto: ThemeSearchParamsDto): Promise<Theme[]> {
    this.policy.can(AbilitiesEnum.THEMES_VIEW);

    return await this.themeListUseCase.execute(themeSearchParamsDto);
  }
}
