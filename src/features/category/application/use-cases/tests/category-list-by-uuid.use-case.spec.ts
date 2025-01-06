import { vi } from 'vitest';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import { UUID } from '@/utils/uuid';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { CategoryListByUuidUseCase } from '@/features/category/application/use-cases/category-list-by-uuid.use-case';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { Category } from '@/features/category/domain/entities/category';
import { PolicyAdapter } from '@/acl/application/adapters/policy.adapter';
import { Policy } from '@/acl/domain/value-objects/policy';

describe('CategoryListByUuidUseCase Unit Tests', () => {
  let sut: CategoryListByUuidUseCase;
  let categoryRepository: CategoryRepository;

  beforeEach(() => {
    categoryRepository = {
      findByUuid: vi.fn(),
    } as unknown as CategoryRepository;

    sut = new CategoryListByUuidUseCase(categoryRepository);

    sut.policy = new PolicyAdapter(
      Policy.create([AbilitiesEnum.CATEGORIES_VIEW]),
    );
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
    sut.policy = new PolicyAdapter(Policy.create());

    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
