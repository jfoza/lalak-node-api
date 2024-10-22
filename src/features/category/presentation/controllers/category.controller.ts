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
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { AbstractCategoryListService } from '@/features/category/domain/services/abstract.category-list.service';
import { AbstractCategoryListByUuidUseCase } from '@/features/category/domain/use-cases/abstract.category-list-by-uuid.use-case';
import { AbstractCategoryCreateUseCase } from '@/features/category/domain/use-cases/abstract.category-create.use-case';
import { AbstractCategoryUpdateUseCase } from '@/features/category/domain/use-cases/abstract.category-update.use-case';
import { AbstractCategoryRemoveUseCase } from '@/features/category/domain/use-cases/abstract.category-remove.use-case';
import { CategorySearchParamsDto } from '@/features/category/application/dto/category-search-params.dto';
import { Category } from '@/features/category/domain/core/category';
import { CreateCategoryDto } from '@/features/category/application/dto/create-category.dto';
import { UpdateCategoryDto } from '@/features/category/application/dto/update-category.dto';

@UseGuards(AuthGuard)
@Controller('admin/categories')
export class CategoryController {
  @Inject(AbstractCategoryListService)
  private readonly categoryListService: AbstractCategoryListService;

  @Inject(AbstractCategoryListByUuidUseCase)
  private readonly categoryListByUuidUseCase: AbstractCategoryListByUuidUseCase;

  @Inject(AbstractCategoryCreateUseCase)
  private readonly categoryCreateUseCase: AbstractCategoryCreateUseCase;

  @Inject(AbstractCategoryUpdateUseCase)
  private readonly categoryUpdateUseCase: AbstractCategoryUpdateUseCase;

  @Inject(AbstractCategoryRemoveUseCase)
  private readonly categoryRemoveUseCase: AbstractCategoryRemoveUseCase;

  @Get()
  async index(
    @Query() categorySearchParamsDto: CategorySearchParamsDto,
  ): Promise<ILengthAwarePaginator | Category[]> {
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
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryCreateUseCase.execute(createCategoryDto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
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
