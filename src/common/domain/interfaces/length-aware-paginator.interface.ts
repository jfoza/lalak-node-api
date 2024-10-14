export interface ILengthAwarePaginator {
  currentPage: number;
  data: any[];
  from: number;
  lastPage: number;
  perPage: number;
  to: number;
  total: number;
}
