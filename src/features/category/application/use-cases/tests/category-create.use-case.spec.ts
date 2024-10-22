import { ThemeRepository } from '@/features/themes/domain/repositories/theme.repository';
import { beforeEach, vi } from 'vitest';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { Theme } from '@/features/themes/domain/core/theme';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { CategoryCreateUseCase } from '@/features/category/application/use-cases/category-create.use-case';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { CreateCategoryDto } from '@/features/category/application/dto/create-category.dto';
import { UUID } from '@/common/infra/utils/uuid';
import { Category } from '@/features/category/domain/core/category';

describe('CategoryCreateUseCase Unit Tests', () => {
  let sut: CategoryCreateUseCase;
  let categoryRepository: CategoryRepository;
  let themeRepository: ThemeRepository;
  let createCategoryDto: CreateCategoryDto;

  beforeEach(() => {
    themeRepository = {
      findByUuid: vi.fn(),
    } as unknown as ThemeRepository;

    categoryRepository = {
      findByName: vi.fn(),
      create: vi.fn(),
    } as unknown as CategoryRepository;

    sut = new CategoryCreateUseCase(categoryRepository, themeRepository);

    createCategoryDto = new CreateCategoryDto();
    createCategoryDto.themeUuid = UUID.generate();
    createCategoryDto.description = 'test';
    createCategoryDto.active = true;

    sut.policy = new Policy();
    sut.policy.abilities = [AbilitiesEnum.CATEGORIES_INSERT];
  });

  it('Should create an Category', async () => {
    const theme: Theme = ProductsDataBuilder.getTheme();
    const category: Category = ProductsDataBuilder.getCategory();

    vi.spyOn(themeRepository, 'findByUuid').mockResolvedValue(theme);
    vi.spyOn(categoryRepository, 'findByName').mockResolvedValue(null);
    vi.spyOn(categoryRepository, 'create').mockResolvedValue(category);

    const result = await sut.execute(createCategoryDto);

    expect(themeRepository.findByUuid).toHaveBeenCalled();
    expect(categoryRepository.findByName).toHaveBeenCalled();
    expect(categoryRepository.create).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Category);
  });

  it('Should return exception if Theme does not exist', async () => {
    vi.spyOn(themeRepository, 'findByUuid').mockResolvedValue(null);

    await expect(sut.execute(createCategoryDto)).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(createCategoryDto)).rejects.toThrow(
      ErrorMessagesEnum.THEME_NOT_FOUND,
    );
  });

  it('Should return exception if category name already exists', async () => {
    const theme: Theme = ProductsDataBuilder.getTheme();
    const category: Category = ProductsDataBuilder.getCategory();

    vi.spyOn(themeRepository, 'findByUuid').mockResolvedValue(theme);
    vi.spyOn(categoryRepository, 'findByName').mockResolvedValue(category);

    await expect(sut.execute(createCategoryDto)).rejects.toThrow(
      ConflictException,
    );
    await expect(sut.execute(createCategoryDto)).rejects.toThrow(
      ErrorMessagesEnum.CATEGORY_NAME_ALREADY_EXISTS,
    );
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(sut.execute(createCategoryDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(createCategoryDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
