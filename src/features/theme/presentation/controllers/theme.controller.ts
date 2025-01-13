import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@/features/auth/infra/config/auth.guard';
import { themeSearchParamsDto } from '@/features/theme/application/dto/theme-search-params.dto';
import { Theme } from '@/features/theme/domain/entities/theme';
import { ThemeCreateDto } from '@/features/theme/application/dto/theme-create.dto';
import { ThemeUpdateDto } from '@/features/theme/application/dto/theme-update.dto';
import { IThemeListService } from '@/features/theme/domain/services/theme-list.service';
import { IThemeRemoveUseCase } from '@/features/theme/domain/use-cases/theme-remove.use-case.interface';
import { IThemeUpdateUseCase } from '@/features/theme/domain/use-cases/theme-update.use-case.interface';
import { IThemeCreateUseCase } from '@/features/theme/domain/use-cases/theme-create.use-case.interface';
import { IThemeListByUuidUseCase } from '@/features/theme/domain/use-cases/theme-list-by-uuid.use-case.interface';
import { TPaginationOrder } from '@/common/presentation/http/types/pagination-order.type';
import { ZodValidationPipe } from '@/common/presentation/http/zod/validation-pipes/zod.validation-pipe';
import { themeSearchParamsDtoSchema } from '@/features/theme/presentation/zod/schemas';

type TThemeSearchParams = {
  description?: string;
} & TPaginationOrder;

@UseGuards(AuthGuard)
@Controller('admin/themes')
export class ThemeController {
  @Inject(IThemeListService)
  private readonly themeListService: IThemeListService;

  @Inject(IThemeListByUuidUseCase)
  private readonly themeListByUuidUseCase: IThemeListByUuidUseCase;

  @Inject(IThemeCreateUseCase)
  private readonly themeCreateUseCase: IThemeCreateUseCase;

  @Inject(IThemeUpdateUseCase)
  private readonly themeUpdateUseCase: IThemeUpdateUseCase;

  @Inject(IThemeRemoveUseCase)
  private readonly themeRemoveUseCase: IThemeRemoveUseCase;

  @Get()
  async index(
    @Query(new ZodValidationPipe(themeSearchParamsDtoSchema))
    query: TThemeSearchParams,
  ): Promise<Theme[]> {
    themeSearchParamsDto.description = query.description;

    themeSearchParamsDto.paginationOrder.page = query.page;
    themeSearchParamsDto.paginationOrder.perPage = query.perPage;
    themeSearchParamsDto.paginationOrder.columnOrder = query.columnOrder;
    themeSearchParamsDto.paginationOrder.columnName = query.columnName;

    return await this.themeListService.handle(themeSearchParamsDto);
  }

  @Get(':uuid')
  async show(@Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<Theme> {
    return await this.themeListByUuidUseCase.execute(uuid);
  }

  @Post()
  async insert(@Body() createThemeDto: ThemeCreateDto): Promise<Theme> {
    return await this.themeCreateUseCase.execute(createThemeDto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateThemeDto: ThemeUpdateDto,
  ): Promise<Theme> {
    return await this.themeUpdateUseCase.execute(uuid, updateThemeDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':uuid')
  async delete(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<void> {
    await this.themeRemoveUseCase.execute(uuid);
  }
}
