import {
  PaginationOrderProps,
  SearchParams,
} from '@/common/domain/core/search-params';

export type CategorySearchParamsProps = {
  themeUuid?: string;
  description?: string;
  active?: boolean;
} & PaginationOrderProps;

export class CategorySearchParams extends SearchParams<CategorySearchParamsProps> {
  constructor(public readonly props: CategorySearchParamsProps) {
    super(props);
  }

  get themeUuid(): string | null {
    return this.props.themeUuid ?? null;
  }

  get description(): string | null {
    return this.props.description ?? null;
  }

  get active(): boolean | null {
    return this.props.active ?? null;
  }

  static create(props: CategorySearchParamsProps): CategorySearchParams {
    return new this(props);
  }
}
