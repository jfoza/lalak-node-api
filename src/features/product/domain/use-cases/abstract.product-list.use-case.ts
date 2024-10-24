import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Product } from '@/features/product/domain/core/product';
import { ProductSearchParamsDto } from '@/features/product/application/dto/product-search-params.dto';

export abstract class AbstractProductListUseCase {
  abstract execute(
    productSearchParamsDto: ProductSearchParamsDto,
  ): Promise<ILengthAwarePaginator | Product[]>;
}
