export interface IPaginationOrder {
  page?: number | null;
  perPage?: number | null;
  columnName: string;
  columnOrder: 'ASC' | 'DESC';
}

export const IPaginationOrder = Symbol('IPaginationOrder');
