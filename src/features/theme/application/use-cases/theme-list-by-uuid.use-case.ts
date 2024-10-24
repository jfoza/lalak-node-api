import { AbstractThemeListByUuidUseCase } from '@/features/theme/domain/use-cases/abstract.theme-list-by-uuid.use-case';
import { Theme } from '@/features/theme/domain/core/theme';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository';
import { Application } from '@/common/application/use-cases/application';
import { ThemeValidations } from '@/features/theme/application/validations/theme.validations';
import { Injectable } from '@nestjs/common';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';

@Injectable()
export class ThemeListByUuidUseCase
  extends Application
  implements AbstractThemeListByUuidUseCase
{
  constructor(private readonly themeRepository: ThemeRepository) {
    super();
  }

  async execute(uuid: string): Promise<Theme> {
    this.policy.can(AbilitiesEnum.THEMES_VIEW);

    return await ThemeValidations.themeExists(uuid, this.themeRepository);
  }
}
