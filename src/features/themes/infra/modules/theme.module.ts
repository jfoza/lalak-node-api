import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeEntity } from '@/features/themes/infra/database/typeorm/entities/theme.entity';
import { Module } from '@nestjs/common';
import { ThemeMapper } from '@/features/themes/infra/database/typeorm/mappers/theme.mapper';
import { TypeormThemeRepository } from '@/features/themes/infra/database/typeorm/repositories/typeorm.theme.repository';
import { ThemeRepository } from '@/features/themes/domain/repositories/theme.repository';
import { ThemeListUseCase } from '@/features/themes/application/use-cases/theme-list.use-case';
import { AbstractThemeListUseCase } from '@/features/themes/domain/use-cases/abstract.theme-list.use-case';
import { ThemeListByUuidUseCase } from '@/features/themes/application/use-cases/theme-list-by-uuid.use-case';
import { AbstractThemeListByUuidUseCase } from '@/features/themes/domain/use-cases/abstract.theme-list-by-uuid.use-case';
import { ThemeCreateUseCase } from '@/features/themes/application/use-cases/theme-create.use-case';
import { AbstractThemeCreateUseCase } from '@/features/themes/domain/use-cases/abstract.theme-create.use-case';
import { ThemeUpdateUseCase } from '@/features/themes/application/use-cases/theme-update.use-case';
import { AbstractThemeUpdateUseCase } from '@/features/themes/domain/use-cases/abstract.theme-update.use-case';
import { ThemeRemoveUseCase } from '@/features/themes/application/use-cases/theme-remove.use-case';
import { AbstractThemeRemoveUseCase } from '@/features/themes/domain/use-cases/abstract.theme-remove.use-case';
import { ThemeController } from '@/features/themes/presentation/controllers/theme.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ThemeEntity])],
  controllers: [ThemeController],
  providers: [
    ThemeMapper,
    TypeormThemeRepository,
    {
      provide: ThemeRepository,
      useExisting: TypeormThemeRepository,
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
  exports: [],
})
export class ThemeModule {}
