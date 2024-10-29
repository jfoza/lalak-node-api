import { Category } from '@/features/category/domain/core/category';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

export class CategoryValidations {
  static async categoryExists(
    uuid: string,
    categoryRepository: CategoryRepository,
  ): Promise<Category> {
    const category = await categoryRepository.findByUuid(uuid);

    if (!category) {
      throw new NotFoundException(ErrorMessagesEnum.CATEGORY_NOT_FOUND);
    }

    return category;
  }

  static async categoriesExists(
    categoriesUuid: string[],
    categoryRepository: CategoryRepository,
  ): Promise<Category[]> {
    const categories: Category[] =
      await categoryRepository.findByUuids(categoriesUuid);

    const uuids: string[] = categories.map(
      (category: Category) => category.uuid,
    );

    for (const categoryUuid of categoriesUuid) {
      if (!uuids.includes(categoryUuid)) {
        throw new NotFoundException(ErrorMessagesEnum.CATEGORY_NOT_FOUND);
      }
    }

    return categories;
  }

  static async categoryExistsByName(
    name: string,
    categoryRepository: CategoryRepository,
  ): Promise<void> {
    if (await categoryRepository.findByName(name)) {
      throw new ConflictException(
        ErrorMessagesEnum.CATEGORY_NAME_ALREADY_EXISTS,
      );
    }
  }

  static async categoryExistsByNameInUpdate(
    uuid: string,
    name: string,
    categoryRepository: CategoryRepository,
  ): Promise<void> {
    const category = await categoryRepository.findByName(name);

    if (category && category.uuid !== uuid) {
      throw new ConflictException(
        ErrorMessagesEnum.CATEGORY_NAME_ALREADY_EXISTS,
      );
    }
  }
}
