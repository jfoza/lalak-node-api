export type PaginationOrderProps = {
  page?: number;
  perPage?: number;
  columnOrder?: string;
  columnName?: string;
};

export class SearchParams<Props> {
  public readonly props: Props & PaginationOrderProps;

  constructor(props: Props & PaginationOrderProps) {
    this.props = props;
  }

  get page(): number | null {
    return this.props.page ?? null;
  }

  get perPage(): number | null {
    return this.props.perPage ?? null;
  }

  get columnOrder(): string | null {
    return this.props.columnOrder ?? null;
  }

  get columnName(): string | null {
    return this.props.columnName ?? null;
  }

  set page(page: number) {
    this.props.page = page;
  }

  set perPage(perPage: number) {
    this.props.perPage = perPage;
  }

  set columnOrder(columnOrder: string) {
    this.props.columnOrder = columnOrder;
  }

  set columnName(columnName: string) {
    this.props.columnName = columnName;
  }
}
