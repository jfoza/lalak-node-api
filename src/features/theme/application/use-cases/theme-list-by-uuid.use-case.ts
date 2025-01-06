import { Theme } from '@/features/theme/domain/entities/theme';
import { Application } from '@/common/application/application';
import { ThemeValidations } from '@/features/theme/application/validations/theme.validations';
import { Inject, Injectable } from '@nestjs/common';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { IThemeListByUuidUseCase } from '@/features/theme/domain/use-cases/theme-list-by-uuid.use-case.interface';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository.interface';

@Injectable()
export class ThemeListByUuidUseCase
  extends Application
  implements IThemeListByUuidUseCase
{
  constructor(
    @Inject(ThemeRepository)
    private readonly themeRepository: ThemeRepository,
  ) {
    super();
  }

  async execute(uuid: string): Promise<Theme> {
    this.policy.can(AbilitiesEnum.THEMES_VIEW);

    return await ThemeValidations.themeExists(uuid, this.themeRepository);
  }
}
