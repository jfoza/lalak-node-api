import { Application } from '@/common/application/use-cases/application';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Theme } from '@/features/themes/domain/core/theme';
import { ThemeSearchParamsDto } from '@/features/themes/application/dto/theme-search-params.dto';
import { AbstractThemeListUseCase } from '@/features/themes/domain/use-cases/abstract.theme-list.use-case';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { AbstractThemeListService } from '@/features/themes/domain/services/abstract.theme-list.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThemeListService
  extends Application
  implements AbstractThemeListService
{
  constructor(private readonly themeListUseCase: AbstractThemeListUseCase) {
    super();
  }

  async handle(
    themeSearchParamsDto: ThemeSearchParamsDto,
  ): Promise<ILengthAwarePaginator | Theme[]> {
    this.policy.can(AbilitiesEnum.THEMES_VIEW);

    return await this.themeListUseCase.execute(themeSearchParamsDto);
  }
}
