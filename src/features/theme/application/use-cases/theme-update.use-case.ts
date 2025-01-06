import { ThemeUpdateDto } from '@/features/theme/application/dto/theme-update.dto';
import { Theme } from '@/features/theme/domain/entities/theme';
import { Application } from '@/common/application/application';
import { Injectable } from '@nestjs/common';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { ThemeValidations } from '@/features/theme/application/validations/theme.validations';
import { IThemeUpdateUseCase } from '@/features/theme/domain/use-cases/theme-update.use-case.interface';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository.interface';

@Injectable()
export class ThemeUpdateUseCase
  extends Application
  implements IThemeUpdateUseCase
{
  constructor(private readonly themeRepository: ThemeRepository) {
    super();
  }

  async execute(uuid: string, updateThemeDto: ThemeUpdateDto): Promise<Theme> {
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
