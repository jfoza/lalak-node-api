import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository';
import { vi } from 'vitest';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { Theme } from '@/features/theme/domain/core/theme';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { UUID } from '@/common/infra/utils/uuid';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { ThemeRemoveUseCase } from '@/features/theme/application/use-cases/theme-remove.use-case';

describe('ThemeRemoveUseCase Unit Tests', () => {
  let sut: ThemeRemoveUseCase;
  let themeRepository: ThemeRepository;

  beforeEach(() => {
    themeRepository = {
      findByUuid: vi.fn(),
      remove: vi.fn(),
    } as unknown as ThemeRepository;

    sut = new ThemeRemoveUseCase(themeRepository);

    sut.policy = new Policy();

    sut.policy.abilities = [AbilitiesEnum.THEMES_DELETE];
  });

  it('Should remove a unique Theme', async () => {
    const theme: Theme = ProductsDataBuilder.getTheme();
    vi.spyOn(themeRepository, 'findByUuid').mockResolvedValue(theme);

    await sut.execute(UUID.generate());

    expect(themeRepository.findByUuid).toHaveBeenCalled();
    expect(themeRepository.remove).toHaveBeenCalled();
  });

  it('Should return exception if Theme not exists', async () => {
    vi.spyOn(themeRepository, 'findByUuid').mockResolvedValue(null);

    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.THEME_NOT_FOUND,
    );
  });

  it('Should return exception if the theme has categories', async () => {
    const theme: Theme = ProductsDataBuilder.getTheme();
    theme.categories = [ProductsDataBuilder.getCategory()];

    vi.spyOn(themeRepository, 'findByUuid').mockResolvedValue(theme);

    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      BadRequestException,
    );
    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.THEME_HAS_CATEGORIES_IN_DELETE,
    );
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
