import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@/features/auth/infra/config/auth.guard';
import { AbstractThemeListUseCase } from '@/features/themes/domain/use-cases/abstract.theme-list.use-case';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { ThemeSearchParamsDto } from '@/features/themes/application/dto/theme-search-params.dto';
import { Theme } from '@/features/themes/domain/core/theme';
import { AbstractThemeCreateUseCase } from '@/features/themes/domain/use-cases/abstract.theme-create.use-case';
import { AbstractThemeUpdateUseCase } from '@/features/themes/domain/use-cases/abstract.theme-update.use-case';
import { CreateThemeDto } from '@/features/themes/application/dto/create-theme.dto';
import { UpdateThemeDto } from '@/features/themes/application/dto/update-theme.dto';
import { AbstractThemeListByUuidUseCase } from '@/features/themes/domain/use-cases/abstract.theme-list-by-uuid.use-case';

@UseGuards(AuthGuard)
@Controller('themes')
export class ThemeController {
  @Inject(AbstractThemeListUseCase)
  private readonly themeListUseCase: AbstractThemeListUseCase;

  @Inject(AbstractThemeListByUuidUseCase)
  private readonly themeListByUuidUseCase: AbstractThemeListByUuidUseCase;

  @Inject(AbstractThemeCreateUseCase)
  private readonly themeCreateUseCase: AbstractThemeCreateUseCase;

  @Inject(AbstractThemeUpdateUseCase)
  private readonly themeUpdateUseCase: AbstractThemeUpdateUseCase;

  @Get()
  async index(
    @Query() themeSearchParamsDto: ThemeSearchParamsDto,
  ): Promise<ILengthAwarePaginator | Theme[]> {
    return await this.themeListUseCase.execute(themeSearchParamsDto);
  }

  @Get(':uuid')
  async show(@Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<Theme> {
    return await this.themeListByUuidUseCase.execute(uuid);
  }

  @Post()
  async insert(@Body() createThemeDto: CreateThemeDto): Promise<Theme> {
    return await this.themeCreateUseCase.execute(createThemeDto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateThemeDto: UpdateThemeDto,
  ): Promise<Theme> {
    return await this.themeUpdateUseCase.execute(uuid, updateThemeDto);
  }
}
