import { Category } from '@/features/category/domain/entities/category';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { AggregateRoot } from '@/common/domain/entities/aggregate-root';

export type ThemeProps = {
  description: string;
  active: boolean;
  createdAt?: Date;
  categories?: Category[];
};

export class Theme extends AggregateRoot<ThemeProps> {
  private constructor(
    public readonly props: ThemeProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
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

  static create(props: ThemeProps, uniqueEntityId?: UniqueEntityId): Theme {
    return new this(props, uniqueEntityId);
  }
}
