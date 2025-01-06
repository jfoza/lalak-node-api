import { Entity } from '@/common/domain/entities/entity';
import { Product } from '@/features/product/domain/entities/product';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

export type CategoryProps = {
  themeUuid: UniqueEntityId;
  description: string;
  active?: boolean;
  createdAt?: Date;
  products?: Product[];
};

export class Category extends Entity<CategoryProps> {
  private constructor(
    public readonly props: CategoryProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get themeUuid(): string {
    return this.props.themeUuid.toValue();
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

  get products(): Product[] {
    return this.props.products ?? [];
  }

  set themeUuid(themeUuid: UniqueEntityId) {
    this.props.themeUuid = themeUuid;
  }

  set description(description: string) {
    this.props.description = description;
  }

  set active(active: boolean) {
    this.props.active = active;
  }

  set products(products: Product[]) {
    this.props.products = products;
  }

  static create(
    props: CategoryProps,
    uniqueEntityId?: UniqueEntityId,
  ): Category {
    return new this(props, uniqueEntityId);
  }
}
