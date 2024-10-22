import { ThemeListService } from '@/features/themes/application/services/theme-list.service';
import { AbstractThemeListUseCase } from '@/features/themes/domain/use-cases/abstract.theme-list.use-case';
import { beforeEach, vi } from 'vitest';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { ThemeSearchParamsDto } from '@/features/themes/application/dto/theme-search-params.dto';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { ForbiddenException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

describe('ThemeListService Unit Tests', () => {
  let sut: ThemeListService;
  let themeListUseCase: AbstractThemeListUseCase;
  let themeSearchParamsDto: ThemeSearchParamsDto;

  const lengthAwarePaginator: ILengthAwarePaginator = {
    currentPage: 1,
    data: [],
    from: 1,
    lastPage: 1,
    perPage: 1,
    to: 1,
    total: 1,
  };

  beforeEach(() => {
    themeListUseCase = {
      execute: vi.fn(async () => lengthAwarePaginator),
    } as AbstractThemeListUseCase;

    sut = new ThemeListService(themeListUseCase);
    sut.policy = new Policy();
    sut.policy.abilities = [AbilitiesEnum.THEMES_VIEW];

    themeSearchParamsDto = new ThemeSearchParamsDto();
    themeSearchParamsDto.page = 1;
    themeSearchParamsDto.perPage = 10;
  });

  it('Should return Should return a paginated list of themes', async () => {
    const result = await sut.handle(themeSearchParamsDto);

    if (Array.isArray(result)) {
      throw new Error('Expected paginated result but received an array.');
    }

    expect(themeListUseCase.execute).toHaveBeenCalled();
    expect(result.currentPage).toBe(lengthAwarePaginator.currentPage);
    expect(result.data).toBe(lengthAwarePaginator.data);
    expect(result.from).toBe(lengthAwarePaginator.from);
    expect(result.lastPage).toBe(lengthAwarePaginator.lastPage);
    expect(result.perPage).toBe(lengthAwarePaginator.perPage);
    expect(result.to).toBe(lengthAwarePaginator.to);
    expect(result.total).toBe(lengthAwarePaginator.total);
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(sut.handle(themeSearchParamsDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.handle(themeSearchParamsDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
