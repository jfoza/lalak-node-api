import { AbstractThemeRemoveUseCase } from '@/features/themes/domain/use-cases/abstract.theme-remove.use-case';
import { ThemeRepository } from '@/features/themes/domain/repositories/theme.repository';
import { Application } from '@/common/application/use-cases/application';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { ThemeValidations } from '@/features/themes/application/validations/theme.validations';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThemeRemoveUseCase
  extends Application
  implements AbstractThemeRemoveUseCase
{
  constructor(private readonly themeRepository: ThemeRepository) {
    super();
  }

  async execute(uuid: string): Promise<void> {
    this.policy.can(AbilitiesEnum.THEMES_DELETE);

    const theme = await ThemeValidations.themeExists(
      uuid,
      this.themeRepository,
    );

    await this.themeRepository.remove(theme.uuid);
  }
}
