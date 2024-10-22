import { Core } from '@/common/domain/core/core';
import { Category } from '@/features/category/domain/core/category';

export type ThemeProps = {
  description: string;
  active: boolean;
  createdAt?: Date;
  categories?: Category[];
};

export class Theme extends Core<ThemeProps> {
  constructor(
    public readonly props: ThemeProps,
    uuid?: string,
  ) {
    super(props, uuid);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get description(): string {
    return this.props.description;
  }

  get active(): boolean {
    return this.props.active;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get categories(): Category[] {
    return this.props.categories;
  }

  set description(description: string) {
    this.props.description = description;
  }

  set active(active: boolean) {
    this.props.active = active;
  }

  set categories(categories: Category[]) {
    this.props.categories = categories;
  }

  static async create(props: ThemeProps, uuid?: string): Promise<Theme> {
    return new this(props, uuid);
  }
}
