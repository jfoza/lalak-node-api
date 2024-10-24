import {
  PaginationOrderProps,
  SearchParams,
} from '@/common/domain/core/search-params';

export type EventSearchParamsProps = {
  description?: string;
  active?: boolean;
} & PaginationOrderProps;

export class EventSearchParams extends SearchParams<EventSearchParamsProps> {
  constructor(public readonly props: EventSearchParamsProps) {
    super(props);
  }

  get description(): string | null {
    return this.props.description ?? null;
  }

  get active(): boolean | null {
    return this.props.active ?? null;
  }

  static create(props: EventSearchParamsProps): EventSearchParams {
    return new this(props);
  }
}
