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
import { categorySearchParamsDto } from '@/features/category/application/dto/category-search-params.dto';
import { Category } from '@/features/category/domain/entities/category';
import { ZodValidationPipe } from '@/common/presentation/zod/validation-pipes/zod.validation-pipe';
import { categorySearchParamsDtoSchema } from '@/features/category/presentation/zod/schemas';
import { TPaginationOrder } from '@/common/presentation/types/pagination-order.type';
import { ICategoryRemoveUseCase } from '@/features/category/domain/use-cases/category-remove.use-case';
import { ICategoryUpdateUseCase } from '@/features/category/domain/use-cases/category-update.use-case';
import { ICategoryCreateUseCase } from '@/features/category/domain/use-cases/category-create.use-case';
import { ICategoryListByUuidUseCase } from '@/features/category/domain/use-cases/category-list-by-uuid.use-case';
import { ICategoryListService } from '@/features/category/domain/services/category-list.service';
import { CategoryCreateDto } from '@/features/category/application/dto/category-create.dto';
import { CategoryUpdateDto } from '@/features/category/application/dto/category-update.dto';

type TCategorySearchParams = {
  themeUuid?: string;
  description?: string;
  active?: boolean;
} & TPaginationOrder;

@UseGuards(AuthGuard)
@Controller('admin/categories')
export class CategoryController {
  @Inject(ICategoryListService)
  private readonly categoryListService: ICategoryListService;

  @Inject(ICategoryListByUuidUseCase)
  private readonly categoryListByUuidUseCase: ICategoryListByUuidUseCase;

  @Inject(ICategoryCreateUseCase)
  private readonly categoryCreateUseCase: ICategoryCreateUseCase;

  @Inject(ICategoryUpdateUseCase)
  private readonly categoryUpdateUseCase: ICategoryUpdateUseCase;

  @Inject(ICategoryRemoveUseCase)
  private readonly categoryRemoveUseCase: ICategoryRemoveUseCase;

  @Get()
  async index(
    @Query(new ZodValidationPipe(categorySearchParamsDtoSchema))
    query: TCategorySearchParams,
  ): Promise<Category[]> {
    categorySearchParamsDto.themeUuid = query.themeUuid;
    categorySearchParamsDto.description = query.description;
    categorySearchParamsDto.active = query.active;

    categorySearchParamsDto.paginationOrder.page = query.page;
    categorySearchParamsDto.paginationOrder.perPage = query.perPage;
    categorySearchParamsDto.paginationOrder.columnOrder = query.columnOrder;
    categorySearchParamsDto.paginationOrder.columnName = query.columnName;

    return await this.categoryListService.handle(categorySearchParamsDto);
  }

  @Get(':uuid')
  async show(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<Category> {
    return await this.categoryListByUuidUseCase.execute(uuid);
  }

  @Post()
  async insert(
    @Body() createCategoryDto: CategoryCreateDto,
  ): Promise<Category> {
    return await this.categoryCreateUseCase.execute(createCategoryDto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateCategoryDto: CategoryUpdateDto,
  ): Promise<Category> {
    return await this.categoryUpdateUseCase.execute(uuid, updateCategoryDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':uuid')
  async delete(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<void> {
    await this.categoryRemoveUseCase.execute(uuid);
  }
}
