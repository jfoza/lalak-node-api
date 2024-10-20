import { ThemeRepository } from '@/features/themes/domain/repositories/theme.repository';
import { vi } from 'vitest';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { ThemeListByUuidUseCase } from '@/features/themes/application/use-cases/theme-list-by-uuid.use-case';
import { Theme } from '@/features/themes/domain/core/theme';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { UUID } from '@/common/infra/utils/uuid';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

describe('ThemeListByUuid Unit Tests', () => {
  let sut: ThemeListByUuidUseCase;
  let themeRepository: ThemeRepository;

  beforeEach(() => {
    themeRepository = {
      findByUuid: vi.fn(),
    } as unknown as ThemeRepository;

    sut = new ThemeListByUuidUseCase(themeRepository);

    sut.policy = new Policy();

    sut.policy.abilities = [AbilitiesEnum.THEMES_ADMIN_VIEW];
  });

  it('Should return a unique Theme', async () => {
    const theme: Theme = ProductsDataBuilder.getTheme();
    vi.spyOn(themeRepository, 'findByUuid').mockResolvedValue(theme);

    const result = await sut.execute(UUID.generate());

    expect(themeRepository.findByUuid).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Theme);
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
