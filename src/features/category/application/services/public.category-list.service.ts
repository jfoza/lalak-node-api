import { CategorySearchParamsDto } from '@/features/category/application/dto/category-search-params.dto';
import { Category } from '@/features/category/domain/entities/category';
import { Inject, Injectable } from '@nestjs/common';
import { IPublicCategoryListService } from '@/features/category/domain/services/public.category-list.service';
import { ICategoryListUseCase } from '@/features/category/domain/use-cases/category-list.use-case';

@Injectable()
export class PublicCategoryListService implements IPublicCategoryListService {
  constructor(
    @Inject(ICategoryListUseCase)
    private readonly categoryListUseCase: ICategoryListUseCase,
  ) {}

  handle(
    categorySearchParamsDto: CategorySearchParamsDto,
  ): Promise<Category[]> {
    return this.categoryListUseCase.execute(categorySearchParamsDto);
  }
}
