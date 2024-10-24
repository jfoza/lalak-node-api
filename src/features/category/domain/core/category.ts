import { Core } from '@/common/domain/core/core';
import { Theme } from '@/features/theme/domain/core/theme';
import { Product } from '@/features/product/domain/core/product';

export type CategoryProps = {
  themeUuid: string;
  description: string;
  active?: boolean;
  createdAt?: Date;
  theme?: Theme;
  products?: Product[];
};

export class Category extends Core<CategoryProps> {
  constructor(
    public readonly props: CategoryProps,
    uuid?: string,
  ) {
    super(props, uuid);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get themeUuid(): string {
    return this.props.themeUuid;
  }

  get description(): string {
    return this.props.description;
  }

  get active(): boolean {
    return this.props.active;
  }

  get theme(): Theme {
    return this.props.theme;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set themeUuid(themeUuid: string) {
    this.props.themeUuid = themeUuid;
  }

  set description(description: string) {
    this.props.description = description;
  }

  set theme(theme: Theme) {
    this.props.theme = theme;
  }

  set active(active: boolean) {
    this.props.active = active;
  }

  static async create(props: CategoryProps, uuid?: string): Promise<Category> {
    return new this(props, uuid);
  }
}
