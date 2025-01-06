import { vi } from 'vitest';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { ThemeListByUuidUseCase } from '@/features/theme/application/use-cases/theme-list-by-uuid.use-case';
import { Theme } from '@/features/theme/domain/entities/theme';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { UUID } from '@/utils/uuid';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository.interface';
import { PolicyAdapter } from '@/acl/application/adapters/policy.adapter';
import { Policy } from '@/acl/domain/value-objects/policy';

describe('ThemeListByUuid Unit Tests', () => {
  let sut: ThemeListByUuidUseCase;
  let themeRepository: ThemeRepository;

  beforeEach(() => {
    themeRepository = {
      findByUuid: vi.fn(),
    } as unknown as ThemeRepository;

    sut = new ThemeListByUuidUseCase(themeRepository);

    sut.policy = new PolicyAdapter(Policy.create([AbilitiesEnum.THEMES_VIEW]));
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
    sut.policy = new PolicyAdapter(Policy.create());

    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
