import { beforeEach, vi } from 'vitest';
import { ThemeCreateUseCase } from '@/features/theme/application/use-cases/theme-create.use-case';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { Theme } from '@/features/theme/domain/entities/theme';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { ConflictException, ForbiddenException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { ThemeCreateDto } from '@/features/theme/application/dto/theme-create.dto';
import { PolicyAdapter } from '@/acl/application/adapters/policy.adapter';
import { Policy } from '@/acl/domain/value-objects/policy';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository.interface';

describe('ThemeCreateUseCase Unit Tests', () => {
  let sut: ThemeCreateUseCase;
  let themeRepository: ThemeRepository;
  let createThemeDto: ThemeCreateDto;

  beforeEach(() => {
    themeRepository = {
      findByName: vi.fn(),
      create: vi.fn(),
    } as unknown as ThemeRepository;

    sut = new ThemeCreateUseCase(themeRepository);

    createThemeDto = new ThemeCreateDto();
    createThemeDto.description = 'test';
    createThemeDto.active = true;

    sut.policy = new PolicyAdapter(
      Policy.create([AbilitiesEnum.THEMES_INSERT]),
    );
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
    sut.policy = new PolicyAdapter(Policy.create());

    await expect(sut.execute(createThemeDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(createThemeDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
