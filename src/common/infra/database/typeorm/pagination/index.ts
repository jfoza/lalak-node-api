import { SelectQueryBuilder } from 'typeorm';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';

type PaginationOptionsType = {
  page: number;
  perPage: number;
};

export async function toPaginate<T>(
  queryBuilder: SelectQueryBuilder<T>,
  options: PaginationOptionsType,
): Promise<ILengthAwarePaginator> {
  const { page, perPage } = options;
  const [items, total] = await queryBuilder
    .skip((page - 1) * perPage)
    .take(perPage)
    .getManyAndCount();

  const lastPage: number = Math.ceil(total / perPage);
  const from: number = total > 0 ? (page - 1) * perPage + 1 : 0;
  const to: number = Math.min(page * perPage, total);

  return {
    currentPage: page,
    data: items,
    from,
    lastPage,
    perPage,
    to,
    total,
  };
}
