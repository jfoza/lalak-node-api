import { IThemeRemoveUseCase } from '@/features/theme/domain/use-cases/theme-remove.use-case.interface';
import { Application } from '@/common/application/application';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { ThemeValidations } from '@/features/theme/application/validations/theme.validations';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository.interface';
import { Theme } from '@/features/theme/domain/entities/theme';

@Injectable()
export class ThemeRemoveUseCase
  extends Application
  implements IThemeRemoveUseCase
{
  constructor(
    @Inject(ThemeRepository)
    private readonly themeRepository: ThemeRepository,
  ) {
    super();
  }

  async execute(uuid: string): Promise<void> {
    this.policy.can(AbilitiesEnum.THEMES_DELETE);

    const theme: Theme = await ThemeValidations.themeExists(
      uuid,
      this.themeRepository,
    );

    if (theme.categories.length > 0) {
      throw new BadRequestException(
        ErrorMessagesEnum.THEME_HAS_CATEGORIES_IN_DELETE,
      );
    }

    await this.themeRepository.remove(theme.uuid);
  }
}
