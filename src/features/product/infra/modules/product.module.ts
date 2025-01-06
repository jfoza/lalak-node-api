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
import { PublicProductListService } from '@/features/product/application/services/public.product-list.service';
import { ProductListByUuidService } from '@/features/product/application/services/product-list-by-uuid.service';
import { PublicProductListByUuidService } from '@/features/product/application/services/public.product-list-by-uuid.service';
import { ProductListUseCase } from '@/features/product/application/use-cases/product-list.use-case';
import { ProductListByUuidUseCase } from '@/features/product/application/use-cases/product-list-by-uuid.use-case';
import { ProductCreateUseCase } from '@/features/product/application/use-cases/product-create.use-case';
import { ProductUpdateUseCase } from '@/features/product/application/use-cases/product-update.use-case';
import { ProductRemoveUseCase } from '@/features/product/application/use-cases/product-remove.use-case';
import { ProductController } from '@/features/product/presentation/controllers/product.controller';
import { UploadModule } from '@/upload/infra/modules/upload.module';
import { ProductCreateService } from '@/features/product/application/services/product-create.service';
import { ProductCreateImageUseCase } from '@/features/product/application/use-cases/product-create-image.use-case';
import { ImageModule } from '@/features/image/infra/modules/image.module';
import { IProductRemoveUseCase } from '@/features/product/domain/use-cases/product-remove.use-case';
import { IProductListService } from '@/features/product/domain/services/product-list.service';
import { IPublicProductListService } from '@/features/product/domain/services/public.product-list.service';
import { IProductListByUuidService } from '@/features/product/domain/services/product-list-by-uuid.service';
import { IPublicProductListByUuidService } from '@/features/product/domain/services/public.product-list-by-uuid.service';
import { IProductCreateService } from '@/features/product/domain/services/product-create.service';
import { IProductListUseCase } from '@/features/product/domain/use-cases/product-list.use-case';
import { IProductListByUuidUseCase } from '@/features/product/domain/use-cases/product-list-by-uuid.use-case';
import { IProductCreateUseCase } from '@/features/product/domain/use-cases/product-create.use-case';
import { IProductCreateImageUseCase } from '@/features/product/domain/use-cases/product-create-image.use-case';
import { IProductUpdateUseCase } from '@/features/product/domain/use-cases/product-update.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, EventEntity]),
    forwardRef(() => CategoryModule),
    forwardRef(() => EventModule),
    UploadModule,
    ImageModule,
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
      provide: IProductListService,
      useExisting: ProductListService,
    },
    PublicProductListService,
    {
      provide: IPublicProductListService,
      useExisting: PublicProductListService,
    },
    ProductListByUuidService,
    {
      provide: IProductListByUuidService,
      useExisting: ProductListByUuidService,
    },
    PublicProductListByUuidService,
    {
      provide: IPublicProductListByUuidService,
      useExisting: PublicProductListByUuidService,
    },
    ProductCreateService,
    {
      provide: IProductCreateService,
      useExisting: ProductCreateService,
    },

    ProductListUseCase,
    {
      provide: IProductListUseCase,
      useExisting: ProductListUseCase,
    },
    ProductListByUuidUseCase,
    {
      provide: IProductListByUuidUseCase,
      useExisting: ProductListByUuidUseCase,
    },
    ProductCreateUseCase,
    {
      provide: IProductCreateUseCase,
      useExisting: ProductCreateUseCase,
    },
    ProductCreateImageUseCase,
    {
      provide: IProductCreateImageUseCase,
      useExisting: ProductCreateImageUseCase,
    },
    ProductUpdateUseCase,
    {
      provide: IProductUpdateUseCase,
      useExisting: ProductUpdateUseCase,
    },
    ProductRemoveUseCase,
    {
      provide: IProductRemoveUseCase,
      useExisting: ProductRemoveUseCase,
    },
  ],
  exports: [ProductQueryRepository],
})
export class ProductModule {}
