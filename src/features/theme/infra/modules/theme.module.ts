import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeEntity } from '@/features/theme/infra/database/typeorm/entities/theme.entity';
import { forwardRef, Module } from '@nestjs/common';
import { ThemeMapper } from '@/features/theme/infra/database/typeorm/mappers/theme.mapper';
import { TypeormThemeRepository } from '@/features/theme/infra/database/typeorm/repositories/typeorm.theme.repository';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository';
import { ThemeListUseCase } from '@/features/theme/application/use-cases/theme-list.use-case';
import { AbstractThemeListUseCase } from '@/features/theme/domain/use-cases/abstract.theme-list.use-case';
import { ThemeListByUuidUseCase } from '@/features/theme/application/use-cases/theme-list-by-uuid.use-case';
import { AbstractThemeListByUuidUseCase } from '@/features/theme/domain/use-cases/abstract.theme-list-by-uuid.use-case';
import { ThemeCreateUseCase } from '@/features/theme/application/use-cases/theme-create.use-case';
import { AbstractThemeCreateUseCase } from '@/features/theme/domain/use-cases/abstract.theme-create.use-case';
import { ThemeUpdateUseCase } from '@/features/theme/application/use-cases/theme-update.use-case';
import { AbstractThemeUpdateUseCase } from '@/features/theme/domain/use-cases/abstract.theme-update.use-case';
import { ThemeRemoveUseCase } from '@/features/theme/application/use-cases/theme-remove.use-case';
import { AbstractThemeRemoveUseCase } from '@/features/theme/domain/use-cases/abstract.theme-remove.use-case';
import { ThemeController } from '@/features/theme/presentation/controllers/theme.controller';
import { ThemeListService } from '@/features/theme/application/services/theme-list.service';
import { PublicThemeListService } from '@/features/theme/application/services/public.theme-list.service';
import { AbstractThemeListService } from '@/features/theme/domain/services/abstract.theme-list.service';
import { PublicAbstractThemeListService } from '@/features/theme/domain/services/public.abstract.theme-list.service';
import { CategoryEntity } from '@/features/category/infra/database/typeorm/entities/category.entity';
import { CategoryModule } from '@/features/category/infra/modules/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ThemeEntity, CategoryEntity]),
    forwardRef(() => CategoryModule),
  ],
  controllers: [ThemeController],
  providers: [
    ThemeMapper,
    TypeormThemeRepository,
    {
      provide: ThemeRepository,
      useExisting: TypeormThemeRepository,
    },

    ThemeListService,
    {
      provide: AbstractThemeListService,
      useExisting: ThemeListService,
    },

    PublicThemeListService,
    {
      provide: PublicAbstractThemeListService,
      useExisting: PublicThemeListService,
    },

    ThemeListUseCase,
    {
      provide: AbstractThemeListUseCase,
      useExisting: ThemeListUseCase,
    },

    ThemeListByUuidUseCase,
    {
      provide: AbstractThemeListByUuidUseCase,
      useExisting: ThemeListByUuidUseCase,
    },

    ThemeCreateUseCase,
    {
      provide: AbstractThemeCreateUseCase,
      useExisting: ThemeCreateUseCase,
    },

    ThemeUpdateUseCase,
    {
      provide: AbstractThemeUpdateUseCase,
      useExisting: ThemeUpdateUseCase,
    },

    ThemeRemoveUseCase,
    {
      provide: AbstractThemeRemoveUseCase,
      useExisting: ThemeRemoveUseCase,
    },
  ],
  exports: [ThemeRepository],
})
export class ThemeModule {}
