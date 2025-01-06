import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeEntity } from '@/features/theme/infra/database/typeorm/entities/theme.entity';
import { CategoryEntity } from '@/features/category/infra/database/typeorm/entities/category.entity';
import { TypeOrmCategoryRepository } from '@/features/category/infra/database/typeorm/repositories/typeorm.category-repository';
import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { CategoryListService } from '@/features/category/application/services/category-list.service';
import { PublicCategoryListService } from '@/features/category/application/services/public.category-list.service';
import { CategoryListUseCase } from '@/features/category/application/use-cases/category-list.use-case';
import { CategoryListByUuidUseCase } from '@/features/category/application/use-cases/category-list-by-uuid.use-case';
import { CategoryCreateUseCase } from '@/features/category/application/use-cases/category-create.use-case';
import { CategoryUpdateUseCase } from '@/features/category/application/use-cases/category-update.use-case';
import { CategoryRemoveUseCase } from '@/features/category/application/use-cases/category-remove.use-case';
import { ThemeModule } from '@/features/theme/infra/modules/theme.module';
import { CategoryController } from '@/features/category/presentation/controllers/category.controller';
import { ProductModule } from '@/features/product/infra/modules/product.module';
import { IPublicCategoryListService } from '@/features/category/domain/services/public.category-list.service';
import { ICategoryListService } from '@/features/category/domain/services/category-list.service';
import { ICategoryRemoveUseCase } from '@/features/category/domain/use-cases/category-remove.use-case';
import { ICategoryCreateUseCase } from '@/features/category/domain/use-cases/category-create.use-case';
import { ICategoryListByUuidUseCase } from '@/features/category/domain/use-cases/category-list-by-uuid.use-case';
import { ICategoryListUseCase } from '@/features/category/domain/use-cases/category-list.use-case';
import { ICategoryUpdateUseCase } from '@/features/category/domain/use-cases/category-update.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([ThemeEntity, CategoryEntity]),
    forwardRef(() => ThemeModule),
    forwardRef(() => ProductModule),
  ],
  controllers: [CategoryController],
  providers: [
    TypeOrmCategoryRepository,
    {
      provide: CategoryRepository,
      useExisting: TypeOrmCategoryRepository,
    },

    CategoryListService,
    {
      provide: ICategoryListService,
      useExisting: CategoryListService,
    },

    PublicCategoryListService,
    {
      provide: IPublicCategoryListService,
      useExisting: PublicCategoryListService,
    },

    CategoryListUseCase,
    {
      provide: ICategoryListUseCase,
      useExisting: CategoryListUseCase,
    },

    CategoryListByUuidUseCase,
    {
      provide: ICategoryListByUuidUseCase,
      useExisting: CategoryListByUuidUseCase,
    },

    CategoryCreateUseCase,
    {
      provide: ICategoryCreateUseCase,
      useExisting: CategoryCreateUseCase,
    },

    CategoryUpdateUseCase,
    {
      provide: ICategoryUpdateUseCase,
      useExisting: CategoryUpdateUseCase,
    },

    CategoryRemoveUseCase,
    {
      provide: ICategoryRemoveUseCase,
      useExisting: CategoryRemoveUseCase,
    },
  ],
  exports: [CategoryRepository],
})
export class CategoryModule {}
