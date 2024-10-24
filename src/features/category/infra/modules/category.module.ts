import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeEntity } from '@/features/theme/infra/database/typeorm/entities/theme.entity';
import { CategoryEntity } from '@/features/category/infra/database/typeorm/entities/category.entity';
import { TypeOrmCategoryRepository } from '@/features/category/infra/database/typeorm/repositories/typeorm.category-repository';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { CategoryListService } from '@/features/category/application/services/category-list.service';
import { AbstractCategoryListService } from '@/features/category/domain/services/abstract.category-list.service';
import { PublicCategoryListService } from '@/features/category/application/services/public.category-list.service';
import { PublicAbstractCategoryListService } from '@/features/category/domain/services/public.abstract.category-list.service';
import { CategoryListUseCase } from '@/features/category/application/use-cases/category-list.use-case';
import { AbstractCategoryListUseCase } from '@/features/category/domain/use-cases/abstract.category-list.use-case';
import { CategoryListByUuidUseCase } from '@/features/category/application/use-cases/category-list-by-uuid.use-case';
import { AbstractCategoryListByUuidUseCase } from '@/features/category/domain/use-cases/abstract.category-list-by-uuid.use-case';
import { CategoryCreateUseCase } from '@/features/category/application/use-cases/category-create.use-case';
import { AbstractCategoryCreateUseCase } from '@/features/category/domain/use-cases/abstract.category-create.use-case';
import { CategoryUpdateUseCase } from '@/features/category/application/use-cases/category-update.use-case';
import { AbstractCategoryUpdateUseCase } from '@/features/category/domain/use-cases/abstract.category-update.use-case';
import { CategoryRemoveUseCase } from '@/features/category/application/use-cases/category-remove.use-case';
import { AbstractCategoryRemoveUseCase } from '@/features/category/domain/use-cases/abstract.category-remove.use-case';
import { ThemeModule } from '@/features/theme/infra/modules/theme.module';
import { CategoryMapper } from '@/features/category/infra/database/typeorm/mappers/category.mapper';
import { CategoryController } from '@/features/category/presentation/controllers/category.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ThemeEntity, CategoryEntity]),
    forwardRef(() => ThemeModule),
  ],
  controllers: [CategoryController],
  providers: [
    CategoryMapper,
    TypeOrmCategoryRepository,
    {
      provide: CategoryRepository,
      useExisting: TypeOrmCategoryRepository,
    },

    CategoryListService,
    {
      provide: AbstractCategoryListService,
      useExisting: CategoryListService,
    },

    PublicCategoryListService,
    {
      provide: PublicAbstractCategoryListService,
      useExisting: PublicCategoryListService,
    },

    CategoryListUseCase,
    {
      provide: AbstractCategoryListUseCase,
      useExisting: CategoryListUseCase,
    },

    CategoryListByUuidUseCase,
    {
      provide: AbstractCategoryListByUuidUseCase,
      useExisting: CategoryListByUuidUseCase,
    },

    CategoryCreateUseCase,
    {
      provide: AbstractCategoryCreateUseCase,
      useExisting: CategoryCreateUseCase,
    },

    CategoryUpdateUseCase,
    {
      provide: AbstractCategoryUpdateUseCase,
      useExisting: CategoryUpdateUseCase,
    },

    CategoryRemoveUseCase,
    {
      provide: AbstractCategoryRemoveUseCase,
      useExisting: CategoryRemoveUseCase,
    },
  ],
  exports: [],
})
export class CategoryModule {}
