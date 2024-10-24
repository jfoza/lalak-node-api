import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository';
import { beforeEach, vi } from 'vitest';
import { Policy } from '@/acl/domain/core/policy';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { Theme } from '@/features/theme/domain/core/theme';
import { ProductsDataBuilder } from '../../../../../../test/unit/products-data-builder';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { CreateCategoryDto } from '@/features/category/application/dto/create-category.dto';
import { UUID } from '@/common/infra/utils/uuid';
import { Category } from '@/features/category/domain/core/category';
import { CategoryUpdateUseCase } from '@/features/category/application/use-cases/category-update.use-case';
import { UpdateCategoryDto } from '@/features/category/application/dto/update-category.dto';

describe('CategoryUpdateUseCase Unit Tests', () => {
  let sut: CategoryUpdateUseCase;
  let categoryRepository: CategoryRepository;
  let themeRepository: ThemeRepository;
  let updateCategoryDto: UpdateCategoryDto;

  beforeEach(() => {
    themeRepository = {
      findByUuid: vi.fn(),
    } as unknown as ThemeRepository;

    categoryRepository = {
      findByUuid: vi.fn(),
      findByName: vi.fn(),
      update: vi.fn(),
    } as unknown as CategoryRepository;

    sut = new CategoryUpdateUseCase(categoryRepository, themeRepository);

    updateCategoryDto = new CreateCategoryDto();
    updateCategoryDto.themeUuid = UUID.generate();
    updateCategoryDto.description = 'test';
    updateCategoryDto.active = true;

    sut.policy = new Policy();
    sut.policy.abilities = [AbilitiesEnum.CATEGORIES_UPDATE];
  });

  it('Should update an Category', async () => {
    const theme: Theme = ProductsDataBuilder.getTheme();
    const category: Category = ProductsDataBuilder.getCategory();

    vi.spyOn(categoryRepository, 'findByUuid').mockResolvedValue(category);
    vi.spyOn(themeRepository, 'findByUuid').mockResolvedValue(theme);
    vi.spyOn(categoryRepository, 'findByName').mockResolvedValue(category);
    vi.spyOn(categoryRepository, 'update').mockResolvedValue(category);

    const result = await sut.execute(UUID.generate(), updateCategoryDto);

    expect(themeRepository.findByUuid).toHaveBeenCalled();
    expect(categoryRepository.findByName).toHaveBeenCalled();
    expect(categoryRepository.update).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Category);
  });

  it('Should return exception if Category does not exist', async () => {
    vi.spyOn(categoryRepository, 'findByUuid').mockResolvedValue(null);

    await expect(
      sut.execute(UUID.generate(), updateCategoryDto),
    ).rejects.toThrow(NotFoundException);
    await expect(
      sut.execute(UUID.generate(), updateCategoryDto),
    ).rejects.toThrow(ErrorMessagesEnum.CATEGORY_NOT_FOUND);
  });

  it('Should return exception if Theme does not exist', async () => {
    const category: Category = ProductsDataBuilder.getCategory();

    vi.spyOn(categoryRepository, 'findByUuid').mockResolvedValue(category);
    vi.spyOn(themeRepository, 'findByUuid').mockResolvedValue(null);

    await expect(
      sut.execute(UUID.generate(), updateCategoryDto),
    ).rejects.toThrow(NotFoundException);
    await expect(
      sut.execute(UUID.generate(), updateCategoryDto),
    ).rejects.toThrow(ErrorMessagesEnum.THEME_NOT_FOUND);
  });

  it('Should return exception if category name already exists', async () => {
    const theme: Theme = ProductsDataBuilder.getTheme();
    const category1: Category = ProductsDataBuilder.getCategory();
    const category2: Category = ProductsDataBuilder.getCategory();

    vi.spyOn(categoryRepository, 'findByUuid').mockResolvedValue(category1);
    vi.spyOn(themeRepository, 'findByUuid').mockResolvedValue(theme);
    vi.spyOn(categoryRepository, 'findByName').mockResolvedValue(category2);

    await expect(
      sut.execute(UUID.generate(), updateCategoryDto),
    ).rejects.toThrow(ConflictException);
    await expect(
      sut.execute(UUID.generate(), updateCategoryDto),
    ).rejects.toThrow(ErrorMessagesEnum.CATEGORY_NAME_ALREADY_EXISTS);
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(
      sut.execute(UUID.generate(), updateCategoryDto),
    ).rejects.toThrow(ForbiddenException);
    await expect(
      sut.execute(UUID.generate(), updateCategoryDto),
    ).rejects.toThrow(ErrorMessagesEnum.NOT_AUTHORIZED);
  });
});
