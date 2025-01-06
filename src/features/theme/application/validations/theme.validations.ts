import { ConflictException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { Theme } from '@/features/theme/domain/entities/theme';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository.interface';

export class ThemeValidations {
  static async themeExists(
    uuid: string,
    themeRepository: ThemeRepository,
  ): Promise<Theme> {
    const theme = await themeRepository.findByUuid(uuid);

    if (!theme) {
      throw new NotFoundException(ErrorMessagesEnum.THEME_NOT_FOUND);
    }

    return theme;
  }

  static async themeExistsByName(
    name: string,
    themeRepository: ThemeRepository,
  ): Promise<void> {
    if (await themeRepository.findByName(name)) {
      throw new ConflictException(ErrorMessagesEnum.THEME_NAME_ALREADY_EXISTS);
    }
  }

  static async themeExistsByNameInUpdate(
    uuid: string,
    name: string,
    themeRepository: ThemeRepository,
  ): Promise<void> {
    const theme = await themeRepository.findByName(name);

    if (theme && theme.uuid !== uuid) {
      throw new ConflictException(ErrorMessagesEnum.THEME_NAME_ALREADY_EXISTS);
    }
  }
}
