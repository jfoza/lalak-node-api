import { ThemeUpdateDto } from '@/features/theme/application/dto/theme-update.dto';
import { beforeEach, vi } from 'vitest';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { Theme } from '@/features/theme/domain/entities/theme';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { ThemeUpdateUseCase } from '@/features/theme/application/use-cases/theme-update.use-case';
import { UUID } from '@/utils/uuid';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository.interface';
import { PolicyAdapter } from '@/acl/application/adapters/policy.adapter';
import { Policy } from '@/acl/domain/value-objects/policy';

describe('ThemeUpdateUseCase Unit Tests', () => {
  let sut: ThemeUpdateUseCase;
  let themeRepository: ThemeRepository;
  let updateThemeDto: ThemeUpdateDto;

  beforeEach(() => {
    themeRepository = {
      findByUuid: vi.fn(),
      findByName: vi.fn(),
      update: vi.fn(),
    } as unknown as ThemeRepository;

    sut = new ThemeUpdateUseCase(themeRepository);

    updateThemeDto = new ThemeUpdateDto();
    updateThemeDto.description = 'test';
    updateThemeDto.active = true;

    sut.policy = new PolicyAdapter(
      Policy.create([AbilitiesEnum.THEMES_UPDATE]),
    );
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
    sut.policy = new PolicyAdapter(Policy.create());

    await expect(sut.execute(UUID.generate(), updateThemeDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(UUID.generate(), updateThemeDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
