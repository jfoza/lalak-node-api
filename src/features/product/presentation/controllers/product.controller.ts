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
import { AbstractProductListService } from '@/features/product/domain/services/abstract.product-list.service';
import { AbstractProductListByUuidService } from '@/features/product/domain/services/abstract.product-list-by-uuid.service';
import { AbstractProductCreateUseCase } from '@/features/product/domain/use-cases/abstract.product-create.use-case';
import { AbstractProductUpdateUseCase } from '@/features/product/domain/use-cases/abstract.product-update.use-case';
import { AbstractProductRemoveUseCase } from '@/features/product/domain/use-cases/abstract.product-remove.use-case';
import { ProductSearchParamsDto } from '@/features/product/application/dto/product-search-params.dto';
import { Product } from '@/features/product/domain/core/product';
import { ProductCreateDto } from '@/features/product/application/dto/product-create.dto';
import { ProductUpdateDto } from '@/features/product/application/dto/product-update.dto';

@UseGuards(AuthGuard)
@Controller('admin/products')
export class ProductController {
  @Inject(AbstractProductListService)
  private readonly productListService: AbstractProductListService;

  @Inject(AbstractProductListByUuidService)
  private readonly productListByUuidService: AbstractProductListByUuidService;

  @Inject(AbstractProductCreateUseCase)
  private readonly productCreateUseCase: AbstractProductCreateUseCase;

  @Inject(AbstractProductUpdateUseCase)
  private readonly productUpdateUseCase: AbstractProductUpdateUseCase;

  @Inject(AbstractProductRemoveUseCase)
  private readonly productRemoveUseCase: AbstractProductRemoveUseCase;

  @Get()
  async index(
    @Query() productSearchParamsDto: ProductSearchParamsDto,
  ): Promise<ILengthAwarePaginator> {
    return await this.productListService.handle(productSearchParamsDto);
  }

  @Get(':uuid')
  async show(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<Product> {
    return await this.productListByUuidService.handle(uuid);
  }

  @Post()
  async insert(@Body() productCreateDto: ProductCreateDto): Promise<Product> {
    return await this.productCreateUseCase.execute(productCreateDto);
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
