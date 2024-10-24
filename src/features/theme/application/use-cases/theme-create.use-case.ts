import { AbstractThemeCreateUseCase } from '@/features/theme/domain/use-cases/abstract.theme-create.use-case';
import { CreateThemeDto } from '@/features/theme/application/dto/create-theme.dto';
import { Theme, ThemeProps } from '@/features/theme/domain/core/theme';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository';
import { Application } from '@/common/application/use-cases/application';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { ThemeValidations } from '@/features/theme/application/validations/theme.validations';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThemeCreateUseCase
  extends Application
  implements AbstractThemeCreateUseCase
{
  constructor(private readonly themeRepository: ThemeRepository) {
    super();
  }

  async execute(createThemeDto: CreateThemeDto): Promise<Theme> {
    this.policy.can(AbilitiesEnum.THEMES_INSERT);

    await ThemeValidations.themeExistsByName(
      createThemeDto.description,
      this.themeRepository,
    );

    const theme = await Theme.create({
      description: createThemeDto.description,
      active: createThemeDto.active,
    } as ThemeProps);

    await this.themeRepository.create(theme);

    return theme;
  }
}
