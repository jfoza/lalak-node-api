import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@/features/product/infra/database/typeorm/entities/product.entity';
import { CategoryModule } from '@/features/category/infra/modules/category.module';
import { EventModule } from '@/features/event/infra/modules/event.module';
import { CategoryEntity } from '@/features/category/infra/database/typeorm/entities/category.entity';
import { EventEntity } from '@/features/event/infra/database/typeorm/entities/event.entity';
import { ProductMapper } from '@/features/product/infra/database/typeorm/mappers/product.mapper';
import { TypeormProductQueryRepository } from '@/features/product/infra/database/typeorm/repositories/typeorm.product-query.repository';
import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';
import { TypeormProductCommandRepository } from '@/features/product/infra/database/typeorm/repositories/typeorm.product-command.repository';
import { ProductCommandRepository } from '@/features/product/domain/repositories/product-command.repository';
import { ProductListService } from '@/features/product/application/services/product-list.service';
import { AbstractProductListService } from '@/features/product/domain/services/abstract.product-list.service';
import { PublicProductListService } from '@/features/product/application/services/public.product-list.service';
import { AbstractPublicProductListService } from '@/features/product/domain/services/abstract.public.product-list.service';
import { ProductListByUuidService } from '@/features/product/application/services/product-list-by-uuid.service';
import { AbstractProductListByUuidService } from '@/features/product/domain/services/abstract.product-list-by-uuid.service';
import { PublicProductListByUuidService } from '@/features/product/application/services/public.product-list-by-uuid.service';
import { AbstractPublicProductListByUuidService } from '@/features/product/domain/services/abstract.public.product-list-by-uuid.service';
import { ProductListUseCase } from '@/features/product/application/use-cases/product-list.use-case';
import { AbstractProductListUseCase } from '@/features/product/domain/use-cases/abstract.product-list.use-case';
import { ProductListByUuidUseCase } from '@/features/product/application/use-cases/product-list-by-uuid.use-case';
import { AbstractProductListByUuidUseCase } from '@/features/product/domain/use-cases/abstract.product-list-by-uuid.use-case';
import { ProductCreateUseCase } from '@/features/product/application/use-cases/product-create.use-case';
import { AbstractProductCreateUseCase } from '@/features/product/domain/use-cases/abstract.product-create.use-case';
import { ProductUpdateUseCase } from '@/features/product/application/use-cases/product-update.use-case';
import { AbstractProductUpdateUseCase } from '@/features/product/domain/use-cases/abstract.product-update.use-case';
import { ProductRemoveUseCase } from '@/features/product/application/use-cases/product-remove.use-case';
import { AbstractProductRemoveUseCase } from '@/features/product/domain/use-cases/abstract.product-remove.use-case';
import { ProductController } from '@/features/product/presentation/controllers/product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, EventEntity]),
    forwardRef(() => CategoryModule),
    forwardRef(() => EventModule),
  ],
  controllers: [ProductController],
  providers: [
    ProductMapper,
    TypeormProductQueryRepository,
    {
      provide: ProductQueryRepository,
      useExisting: TypeormProductQueryRepository,
    },
    TypeormProductCommandRepository,
    {
      provide: ProductCommandRepository,
      useExisting: TypeormProductCommandRepository,
    },

    ProductListService,
    {
      provide: AbstractProductListService,
      useExisting: ProductListService,
    },
    PublicProductListService,
    {
      provide: AbstractPublicProductListService,
      useExisting: PublicProductListService,
    },
    ProductListByUuidService,
    {
      provide: AbstractProductListByUuidService,
      useExisting: ProductListByUuidService,
    },
    PublicProductListByUuidService,
    {
      provide: AbstractPublicProductListByUuidService,
      useExisting: PublicProductListByUuidService,
    },

    ProductListUseCase,
    {
      provide: AbstractProductListUseCase,
      useExisting: ProductListUseCase,
    },
    ProductListByUuidUseCase,
    {
      provide: AbstractProductListByUuidUseCase,
      useExisting: ProductListByUuidUseCase,
    },
    ProductCreateUseCase,
    {
      provide: AbstractProductCreateUseCase,
      useExisting: ProductCreateUseCase,
    },
    ProductUpdateUseCase,
    {
      provide: AbstractProductUpdateUseCase,
      useExisting: ProductUpdateUseCase,
    },
    ProductRemoveUseCase,
    {
      provide: AbstractProductRemoveUseCase,
      useExisting: ProductRemoveUseCase,
    },
  ],
  exports: [ProductQueryRepository],
})
export class ProductModule {}
