import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeEntity } from '@/features/theme/infra/database/typeorm/entities/theme.entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeormThemeRepository } from '@/features/theme/infra/database/typeorm/repositories/typeorm.theme.repository';
import { ThemeListUseCase } from '@/features/theme/application/use-cases/theme-list.use-case';
import { ThemeListByUuidUseCase } from '@/features/theme/application/use-cases/theme-list-by-uuid.use-case';
import { ThemeCreateUseCase } from '@/features/theme/application/use-cases/theme-create.use-case';
import { ThemeUpdateUseCase } from '@/features/theme/application/use-cases/theme-update.use-case';
import { ThemeRemoveUseCase } from '@/features/theme/application/use-cases/theme-remove.use-case';
import { ThemeController } from '@/features/theme/presentation/controllers/theme.controller';
import { ThemeListService } from '@/features/theme/application/services/theme-list.service';
import { PublicThemeListService } from '@/features/theme/application/services/public.theme-list.service';
import { CategoryEntity } from '@/features/category/infra/database/typeorm/entities/category.entity';
import { CategoryModule } from '@/features/category/infra/modules/category.module';
import { ThemeRepository } from '@/features/theme/domain/repositories/theme.repository.interface';
import { IThemeListService } from '@/features/theme/domain/services/theme-list.service';
import { IPublicThemeListService } from '@/features/theme/domain/services/public.theme-list.service';
import { IThemeListUseCase } from '@/features/theme/domain/use-cases/theme-list.use-case.interface';
import { IThemeListByUuidUseCase } from '@/features/theme/domain/use-cases/theme-list-by-uuid.use-case.interface';
import { IThemeCreateUseCase } from '@/features/theme/domain/use-cases/theme-create.use-case.interface';
import { IThemeUpdateUseCase } from '@/features/theme/domain/use-cases/theme-update.use-case.interface';
import { IThemeRemoveUseCase } from '@/features/theme/domain/use-cases/theme-remove.use-case.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([ThemeEntity, CategoryEntity]),
    forwardRef(() => CategoryModule),
  ],
  controllers: [ThemeController],
  providers: [
    TypeormThemeRepository,
    {
      provide: ThemeRepository,
      useExisting: TypeormThemeRepository,
    },

    ThemeListService,
    {
      provide: IThemeListService,
      useExisting: ThemeListService,
    },

    PublicThemeListService,
    {
      provide: IPublicThemeListService,
      useExisting: PublicThemeListService,
    },

    ThemeListUseCase,
    {
      provide: IThemeListUseCase,
      useExisting: ThemeListUseCase,
    },

    ThemeListByUuidUseCase,
    {
      provide: IThemeListByUuidUseCase,
      useExisting: ThemeListByUuidUseCase,
    },

    ThemeCreateUseCase,
    {
      provide: IThemeCreateUseCase,
      useExisting: ThemeCreateUseCase,
    },

    ThemeUpdateUseCase,
    {
      provide: IThemeUpdateUseCase,
      useExisting: ThemeUpdateUseCase,
    },

    ThemeRemoveUseCase,
    {
      provide: IThemeRemoveUseCase,
      useExisting: ThemeRemoveUseCase,
    },
  ],
  exports: [ThemeRepository],
})
export class ThemeModule {}
