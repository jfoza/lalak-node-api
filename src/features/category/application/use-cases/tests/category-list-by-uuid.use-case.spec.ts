import { vi } from 'vitest';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { UUID } from '@/common/infra/utils/uuid';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { CategoryListByUuidUseCase } from '@/features/category/application/use-cases/category-list-by-uuid.use-case';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { Category } from '@/features/category/domain/core/category';

describe('CategoryListByUuidUseCase Unit Tests', () => {
  let sut: CategoryListByUuidUseCase;
  let categoryRepository: CategoryRepository;

  beforeEach(() => {
    categoryRepository = {
      findByUuid: vi.fn(),
    } as unknown as CategoryRepository;

    sut = new CategoryListByUuidUseCase(categoryRepository);

    sut.policy = new Policy();

    sut.policy.abilities = [AbilitiesEnum.CATEGORIES_VIEW];
  });

  it('Should return a unique Category', async () => {
    const category: Category = ProductsDataBuilder.getCategory();
    vi.spyOn(categoryRepository, 'findByUuid').mockResolvedValue(category);

    const result = await sut.execute(UUID.generate());

    expect(categoryRepository.findByUuid).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Category);
  });

  it('Should return exception if Category not exists', async () => {
    vi.spyOn(categoryRepository, 'findByUuid').mockResolvedValue(null);

    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.CATEGORY_NOT_FOUND,
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
