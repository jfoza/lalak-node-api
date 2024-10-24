import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository';
import { UpdateThemeDto } from '@/features/theme/application/dto/update-theme.dto';
import { beforeEach, vi } from 'vitest';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { Theme } from '@/features/theme/domain/core/theme';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { ThemeUpdateUseCase } from '@/features/theme/application/use-cases/theme-update.use-case';
import { UUID } from '@/common/infra/utils/uuid';

describe('ThemeUpdateUseCase Unit Tests', () => {
  let sut: ThemeUpdateUseCase;
  let themeRepository: ThemeRepository;
  let updateThemeDto: UpdateThemeDto;

  beforeEach(() => {
    themeRepository = {
      findByUuid: vi.fn(),
      findByName: vi.fn(),
      update: vi.fn(),
    } as unknown as ThemeRepository;

    sut = new ThemeUpdateUseCase(themeRepository);

    updateThemeDto = new UpdateThemeDto();
    updateThemeDto.description = 'test';
    updateThemeDto.active = true;

    sut.policy = new Policy();
    sut.policy.abilities = [AbilitiesEnum.THEMES_UPDATE];
  });

  it('Should update a theme', async () => {
    const theme: Theme = ProductsDataBuilder.getTheme();

    vi.spyOn(themeRepository, 'findByUuid').mockResolvedValue(theme);
    vi.spyOn(themeRepository, 'findByName').mockResolvedValue(theme);
    vi.spyOn(themeRepository, 'update').mockResolvedValue(theme);

    const result = await sut.execute(UUID.generate(), updateThemeDto);

    expect(themeRepository.findByUuid).toHaveBeenCalled();
    expect(themeRepository.findByName).toHaveBeenCalled();
    expect(themeRepository.update).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Theme);
  });

  it('Should return exception if theme uuid not exists', async () => {
    vi.spyOn(themeRepository, 'findByUuid').mockResolvedValue(null);

    await expect(sut.execute(UUID.generate(), updateThemeDto)).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(UUID.generate(), updateThemeDto)).rejects.toThrow(
      ErrorMessagesEnum.THEME_NOT_FOUND,
    );
  });

  it('Should return exception if theme name already exists', async () => {
    const theme1: Theme = ProductsDataBuilder.getTheme();
    const theme2: Theme = ProductsDataBuilder.getTheme();

    vi.spyOn(themeRepository, 'findByUuid').mockResolvedValue(theme1);
    vi.spyOn(themeRepository, 'findByName').mockResolvedValue(theme2);

    await expect(sut.execute(UUID.generate(), updateThemeDto)).rejects.toThrow(
      ConflictException,
    );
    await expect(sut.execute(UUID.generate(), updateThemeDto)).rejects.toThrow(
      ErrorMessagesEnum.THEME_NAME_ALREADY_EXISTS,
    );
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(sut.execute(UUID.generate(), updateThemeDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(UUID.generate(), updateThemeDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
