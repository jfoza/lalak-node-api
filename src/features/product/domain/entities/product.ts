import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { UniqueName } from '@/common/domain/value-objects/unique-name';
import { AggregateRoot } from '@/common/domain/entities/aggregate-root';
import { ProductCategory } from '@/features/product/domain/entities/product-category';
import { ProductEvent } from '@/features/product/domain/entities/product-event';
import { ProductImage } from '@/features/product/domain/entities/product-image';
import { productValidator } from '@/features/product/domain/validators/product.validator';

export type ProductProps = {
  description: string;
  details?: string;
  uniqueName: UniqueName;
  value: number;
  quantity: number;
  balance: number;
  active: boolean;
  createdAt?: Date;
  categories?: ProductCategory[];
  images?: ProductImage[];
  events?: ProductEvent[];
};

export class Product extends AggregateRoot<ProductProps> {
  private constructor(
    public readonly props: ProductProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get description(): string {
    return this.props.description;
  }

  get details(): string {
    return this.props.details;
  }

  get uniqueName(): string {
    return this.props.uniqueName.toValue();
  }

  get value(): number {
    return this.props.value;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get balance(): number {
    return this.props.balance;
  }

  get active(): boolean {
    return this.props.active;
  }

  get categories(): ProductCategory[] {
    return this.props.categories ?? [];
  }

  get events(): ProductEvent[] {
    return this.props.events ?? [];
  }

  get images(): ProductImage[] {
    return this.props.images ?? [];
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set description(description: string) {
    this.props.description = description;
  }

  set details(details: string) {
    this.props.details = details;
  }

  set uniqueName(uniqueName: UniqueName) {
    this.props.uniqueName = uniqueName;
  }

  set value(value: number) {
    this.props.value = value;
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity;
  }

  set balance(balance: number) {
    this.props.balance = balance;
  }

  set active(active: boolean) {
    this.props.active = active;
  }

  set categories(productCategories: ProductCategory[]) {
    this.props.categories = productCategories;
  }

  set events(productEvents: ProductEvent[]) {
    this.props.events = productEvents;
  }

  set images(productImages: ProductImage[]) {
    this.props.images = productImages;
  }

  static createFrom(
    props: ProductProps,
    uniqueEntityId?: UniqueEntityId,
  ): Product {
    productValidator.validate(props);

    return this.create(props, uniqueEntityId);
  }

  static create(props: ProductProps, uniqueEntityId?: UniqueEntityId): Product {
    return new this(props, uniqueEntityId);
  }
}
