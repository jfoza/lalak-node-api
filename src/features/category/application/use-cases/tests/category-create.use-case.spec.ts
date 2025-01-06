import { beforeEach, vi } from 'vitest';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { Theme } from '@/features/theme/domain/entities/theme';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { CategoryCreateUseCase } from '@/features/category/application/use-cases/category-create.use-case';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { UUID } from '@/utils/uuid';
import { Category } from '@/features/category/domain/entities/category';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository.interface';
import { ICategoryCreateDto } from '@/features/category/domain/dto/category-create.dto';
import { CategoryCreateDto } from '@/features/category/application/dto/category-create.dto';
import { PolicyAdapter } from '@/acl/application/adapters/policy.adapter';
import { Policy } from '@/acl/domain/value-objects/policy';

describe('CategoryCreateUseCase Unit Tests', () => {
  let sut: CategoryCreateUseCase;
  let categoryRepository: CategoryRepository;
  let themeRepository: ThemeRepository;
  let createCategoryDto: ICategoryCreateDto;

  beforeEach(() => {
    themeRepository = {
      findByUuid: vi.fn(),
    } as unknown as ThemeRepository;

    categoryRepository = {
      findByName: vi.fn(),
      create: vi.fn(),
    } as unknown as CategoryRepository;

    sut = new CategoryCreateUseCase(categoryRepository, themeRepository);

    createCategoryDto = new CategoryCreateDto();
    createCategoryDto.themeUuid = UUID.generate();
    createCategoryDto.description = 'test';
    createCategoryDto.active = true;

    sut.policy = new PolicyAdapter(
      Policy.create([AbilitiesEnum.CATEGORIES_INSERT]),
    );
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
    sut.policy = new PolicyAdapter(Policy.create());

    await expect(sut.execute(createCategoryDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(createCategoryDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
