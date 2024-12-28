import { IPaginationOrder } from '@/common/domain/dto/pagination-order.interface';

type TColumnOrder = 'ASC' | 'DESC';

export class PaginationOrder implements IPaginationOrder {
  private _page?: number;
  private _perPage: number = 100;
  private _columnName: string | null = null;
  private _columnOrder: TColumnOrder = 'DESC';

  get page(): number | undefined {
    return this._page;
  }

  set page(value: number | undefined) {
    this._page = value ?? null;
  }

  get perPage(): number {
    return this._perPage;
  }

  set perPage(value: number | undefined) {
    let valueAux: number = value ?? 100;

    if (valueAux > 100) {
      valueAux = 100;
    }

    this._perPage = valueAux;
  }

  get columnName(): string | null {
    return this._columnName;
  }

  set columnName(value: string | null | undefined) {
    this._columnName = value ?? 'created_at';
  }

  get columnOrder(): TColumnOrder {
    return this._columnOrder;
  }

  set columnOrder(value: TColumnOrder | undefined) {
    this._columnOrder = value ?? 'DESC';
  }
}
