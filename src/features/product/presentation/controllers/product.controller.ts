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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@/features/auth/infra/config/auth.guard';
import { productSearchParamsDto } from '@/features/product/application/dto/product-search-params.dto';
import { Product } from '@/features/product/domain/entities/product';
import { ProductCreateDto } from '@/features/product/application/dto/product-create.dto';
import { ProductUpdateDto } from '@/features/product/application/dto/product-update.dto';
import { FileDto } from '@/upload/application/dto/file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from '@/common/presentation/http/zod/validation-pipes/zod.validation-pipe';
import { productSearchParamsDtoSchema } from '@/features/product/presentation/zod/schemas';
import { TPaginationOrder } from '@/common/presentation/http/types/pagination-order.type';
import { IProductRemoveUseCase } from '@/features/product/domain/use-cases/product-remove.use-case';
import { IProductListService } from '@/features/product/domain/services/product-list.service';
import { IProductListByUuidService } from '@/features/product/domain/services/product-list-by-uuid.service';
import { IProductCreateService } from '@/features/product/domain/services/product-create.service';
import { IProductUpdateUseCase } from '@/features/product/domain/use-cases/product-update.use-case';

type TProductSearchParams = {
  description?: string;
  userUuid?: string;
  categories?: string[];
  events?: string[];
  active?: boolean;
} & TPaginationOrder;

@UseGuards(AuthGuard)
@Controller('admin/products')
export class ProductController {
  @Inject(IProductListService)
  private readonly productListService: IProductListService;

  @Inject(IProductListByUuidService)
  private readonly productListByUuidService: IProductListByUuidService;

  @Inject(IProductCreateService)
  private readonly productCreateService: IProductCreateService;

  @Inject(IProductUpdateUseCase)
  private readonly productUpdateUseCase: IProductUpdateUseCase;

  @Inject(IProductRemoveUseCase)
  private readonly productRemoveUseCase: IProductRemoveUseCase;

  @Get()
  async index(
    @Query(new ZodValidationPipe(productSearchParamsDtoSchema))
    query: TProductSearchParams,
  ): Promise<Product[]> {
    productSearchParamsDto.description = query.description;
    productSearchParamsDto.userUuid = query.userUuid;
    productSearchParamsDto.categories = query.categories;
    productSearchParamsDto.events = query.events;
    productSearchParamsDto.active = query.active;

    productSearchParamsDto.paginationOrder.page = query.page;
    productSearchParamsDto.paginationOrder.perPage = query.perPage;
    productSearchParamsDto.paginationOrder.columnOrder = query.columnOrder;
    productSearchParamsDto.paginationOrder.columnName = query.columnName;

    return await this.productListService.handle(productSearchParamsDto);
  }

  @Get(':uuid')
  async show(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<Product> {
    return await this.productListByUuidService.handle(uuid);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async insert(
    @Body() productCreateDto: ProductCreateDto,
    @UploadedFile() file?: FileDto,
  ): Promise<any> {
    return await this.productCreateService.handle(productCreateDto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() productUpdateDto: ProductUpdateDto,
  ): Promise<Product> {
    return await this.productUpdateUseCase.execute(uuid, productUpdateDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':uuid')
  async delete(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<void> {
    await this.productRemoveUseCase.execute(uuid);
  }
}
