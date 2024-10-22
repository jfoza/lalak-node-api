import {
  PaginationOrderProps,
  SearchParams,
} from '@/common/domain/core/search-params';

export type ThemeSearchParamsProps = {
  description?: string;
} & PaginationOrderProps;

export class ThemeSearchParams extends SearchParams<ThemeSearchParamsProps> {
  constructor(public readonly props: ThemeSearchParamsProps) {
    super(props);
  }

  get description(): string | null {
    return this.props.description ?? null;
  }

  static create(props: ThemeSearchParamsProps): ThemeSearchParams {
    return new this(props);
  }
}
