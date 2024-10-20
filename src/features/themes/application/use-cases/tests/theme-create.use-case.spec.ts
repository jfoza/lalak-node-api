import { ThemeRepository } from '@/features/themes/domain/repositories/theme.repository';
import { beforeEach, vi } from 'vitest';
import { ThemeCreateUseCase } from '@/features/themes/application/use-cases/theme-create.use-case';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { Theme } from '@/features/themes/domain/core/theme';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { ConflictException, ForbiddenException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { CreateThemeDto } from '@/features/themes/application/dto/create-theme.dto';

describe('ThemeCreateUseCase Unit Tests', () => {
  let sut: ThemeCreateUseCase;
  let themeRepository: ThemeRepository;
  let createThemeDto: CreateThemeDto;

  beforeEach(() => {
    themeRepository = {
      findByName: vi.fn(),
      create: vi.fn(),
    } as unknown as ThemeRepository;

    sut = new ThemeCreateUseCase(themeRepository);

    createThemeDto = new CreateThemeDto();
    createThemeDto.description = 'test';
    createThemeDto.active = true;

    sut.policy = new Policy();
    sut.policy.abilities = [AbilitiesEnum.THEMES_INSERT];
  });

  it('Should create a theme', async () => {
    const theme: Theme = ProductsDataBuilder.getTheme();

    vi.spyOn(themeRepository, 'findByName').mockResolvedValue(null);
    vi.spyOn(themeRepository, 'create').mockResolvedValue(theme);

    const result = await sut.execute(createThemeDto);

    expect(themeRepository.findByName).toHaveBeenCalled();
    expect(themeRepository.create).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Theme);
  });

  it('Should return exception if theme name already exists', async () => {
    const theme: Theme = ProductsDataBuilder.getTheme();

    vi.spyOn(themeRepository, 'findByName').mockResolvedValue(theme);

    await expect(sut.execute(createThemeDto)).rejects.toThrow(
      ConflictException,
    );
    await expect(sut.execute(createThemeDto)).rejects.toThrow(
      ErrorMessagesEnum.THEME_NAME_ALREADY_EXISTS,
    );
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(sut.execute(createThemeDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(createThemeDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
