import { AbstractThemeUpdateUseCase } from '@/features/theme/domain/use-cases/abstract.theme-update.use-case';
import { UpdateThemeDto } from '@/features/theme/application/dto/update-theme.dto';
import { Theme } from '@/features/theme/domain/core/theme';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository';
import { Application } from '@/common/application/use-cases/application';
import { Injectable } from '@nestjs/common';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { ThemeValidations } from '@/features/theme/application/validations/theme.validations';

@Injectable()
export class ThemeUpdateUseCase
  extends Application
  implements AbstractThemeUpdateUseCase
{
  constructor(private readonly themeRepository: ThemeRepository) {
    super();
  }

  async execute(uuid: string, updateThemeDto: UpdateThemeDto): Promise<Theme> {
    this.policy.can(AbilitiesEnum.THEMES_UPDATE);

    const theme = await ThemeValidations.themeExists(
      uuid,
      this.themeRepository,
    );

    await ThemeValidations.themeExistsByNameInUpdate(
      theme.uuid,
      updateThemeDto.description,
      this.themeRepository,
    );

    theme.description = updateThemeDto.description;
    theme.active = updateThemeDto.active;

    await this.themeRepository.update(theme);

    return theme;
  }
}
