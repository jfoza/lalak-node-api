import { Category } from '@/features/category/domain/entities/category';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { ICategoryListUseCase } from '@/features/category/domain/use-cases/category-list.use-case';
import { ICategorySearchParamsDto } from '@/features/category/domain/dto/category-search-params.dto';

@Injectable()
export class CategoryListUseCase implements ICategoryListUseCase {
  constructor(
    @Inject(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(
    categorySearchParamsDto: ICategorySearchParamsDto,
  ): Promise<Category[]> {
    return await this.categoryRepository.findAll(categorySearchParamsDto);
  }
}
