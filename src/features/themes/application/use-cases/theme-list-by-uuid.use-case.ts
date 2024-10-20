import { AbstractThemeListByUuidUseCase } from '@/features/themes/domain/use-cases/abstract.theme-list-by-uuid.use-case';
import { Theme } from '@/features/themes/domain/core/theme';
import { ThemeRepository } from '@/features/themes/domain/repositories/theme.repository';
import { Application } from '@/common/application/use-cases/application';
import { ThemeValidations } from '@/features/themes/application/validations/theme.validations';
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
    this.policy.can(AbilitiesEnum.THEMES_ADMIN_VIEW);

    return await ThemeValidations.themeExists(uuid, this.themeRepository);
  }
}
