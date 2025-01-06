export interface LengthAwarePaginator<T> {
  currentPage: number;
  data: T[];
  from: number;
  lastPage: number;
  perPage: number;
  to: number;
  total: number;
}
