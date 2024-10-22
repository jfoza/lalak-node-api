import { vi } from 'vitest';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { CategoryListService } from '@/features/category/application/services/category-list.service';
import { AbstractCategoryListUseCase } from '@/features/category/domain/use-cases/abstract.category-list.use-case';
import { CategorySearchParamsDto } from '@/features/category/application/dto/category-search-params.dto';
import { ForbiddenException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

describe('CategoryListService Unit Tests', () => {
  let sut: CategoryListService;
  let categoryListUseCase: AbstractCategoryListUseCase;
  let categorySearchParamsDto: CategorySearchParamsDto;

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
    categoryListUseCase = {
      execute: vi.fn(async () => lengthAwarePaginator),
    } as AbstractCategoryListUseCase;

    sut = new CategoryListService(categoryListUseCase);
    sut.policy = new Policy();
    sut.policy.abilities = [AbilitiesEnum.CATEGORIES_VIEW];

    categorySearchParamsDto = {
      page: 1,
      perPage: 10,
    } as CategorySearchParamsDto;
  });

  it('Should return Should return a paginated list of categories', async () => {
    const result = await sut.handle(categorySearchParamsDto);

    if (Array.isArray(result)) {
      throw new Error('Expected paginated result but received an array.');
    }

    expect(categoryListUseCase.execute).toHaveBeenCalled();
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

    await expect(sut.handle(categorySearchParamsDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.handle(categorySearchParamsDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
