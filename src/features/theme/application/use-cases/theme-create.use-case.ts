import { Theme, ThemeProps } from '@/features/theme/domain/entities/theme';
import { Application } from '@/common/application/application';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { ThemeValidations } from '@/features/theme/application/validations/theme.validations';
import { Inject, Injectable } from '@nestjs/common';
import { IThemeCreateUseCase } from '@/features/theme/domain/use-cases/theme-create.use-case.interface';
import { IThemeCreateDto } from '@/features/theme/domain/dto/theme-create.dto.interface';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository.interface';

@Injectable()
export class ThemeCreateUseCase
  extends Application
  implements IThemeCreateUseCase
{
  constructor(
    @Inject(ThemeRepository)
    private readonly themeRepository: ThemeRepository,
  ) {
    super();
  }

  async execute(createThemeDto: IThemeCreateDto): Promise<Theme> {
    this.policy.can(AbilitiesEnum.THEMES_INSERT);

    await ThemeValidations.themeExistsByName(
      createThemeDto.description,
      this.themeRepository,
    );

    const theme = Theme.create({
      description: createThemeDto.description,
      active: createThemeDto.active,
    } as ThemeProps);

    await this.themeRepository.create(theme);

    return theme;
  }
}
