import {
  PaginationOrderProps,
  SearchParams,
} from '@/common/domain/core/search-params';

export type ProductSearchParamsProps = {
  description?: string;
  userUuid?: string;
  categories?: string[];
  events?: string[];
  active?: boolean;
} & PaginationOrderProps;

export class ProductSearchParams extends SearchParams<ProductSearchParamsProps> {
  constructor(public readonly props: ProductSearchParamsProps) {
    super(props);
  }

  get description(): string | null {
    return this.props.description ?? null;
  }

  get userUuid(): string {
    return this.props.userUuid;
  }

  get categories(): string[] {
    return this.props.categories ?? [];
  }

  get events(): string[] {
    return this.props.events ?? [];
  }

  get active(): boolean {
    return this.props.active;
  }

  static create(props: ProductSearchParamsProps): ProductSearchParams {
    return new this(props);
  }
}
