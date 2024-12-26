import { AbstractCategoryListUseCase } from '@/features/category/domain/use-cases/abstract.category-list.use-case';
import { CategorySearchParamsDto } from '@/features/category/application/dto/category-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Category } from '@/features/category/domain/core/category';
import {
  CategorySearchParams,
  CategorySearchParamsProps,
} from '@/features/category/domain/core/category-search-params';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';

@Injectable()
export class CategoryListUseCase implements AbstractCategoryListUseCase {
  constructor(
    @Inject(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(
    categorySearchParamsDto: CategorySearchParamsDto,
  ): Promise<ILengthAwarePaginator | Category[]> {
    const {
      themeUuid,
      description,
      active,
      page,
      perPage,
      columnOrder,
      columnName,
    } = categorySearchParamsDto;

    const categorySearchParams = CategorySearchParams.create({
      themeUuid,
      description,
      active,
      columnOrder,
      columnName,
    } as CategorySearchParamsProps);

    if (page) {
      categorySearchParams.page = page;
      categorySearchParams.perPage = perPage;

      return await this.categoryRepository.paginate(categorySearchParams);
    }

    return await this.categoryRepository.findAll(categorySearchParams);
  }
}
