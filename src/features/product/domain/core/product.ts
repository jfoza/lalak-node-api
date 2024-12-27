import { Entity } from '@/common/domain/entities/entity';
import { ProductValidatorFactory } from '@/features/product/domain/validators/product.validator';
import { Category } from '@/features/category/domain/core/category';
import { Event } from '@/features/event/domain/core/event';
import { Image } from '@/features/image/domain/core/image';

export type ProductProps = {
  description: string;
  details?: string;
  uniqueName: string;
  value: number;
  quantity: number;
  balance: number;
  active: boolean;
  createdAt?: Date;
  categories?: Category[];
  images: Image[];
  events?: Event[];
};

export class Product extends Entity<ProductProps> {
  constructor(
    public readonly props: ProductProps,
    uuid?: string,
  ) {
    super(props, uuid);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get description() {
    return this.props.description;
  }

  get details() {
    return this.props.details;
  }

  get uniqueName() {
    return this.props.uniqueName;
  }

  get value() {
    return this.props.value;
  }

  get quantity() {
    return this.props.quantity;
  }

  get balance() {
    return this.props.balance;
  }

  get active() {
    return this.props.active;
  }

  get categories(): Category[] {
    return this.props.categories ?? [];
  }

  get events(): Event[] {
    return this.props.events ?? [];
  }

  get images(): Image[] {
    return this.props.images ?? [];
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get categoriesUuid(): string[] {
    return this.categories.map((category: Category) => category.uuid);
  }

  get eventsUuid(): string[] {
    return this.events.map((event: Event) => event.uuid);
  }

  get imagesUuid(): string[] {
    return this.images.map((image: Image) => image.uuid);
  }

  set description(description: string) {
    this.props.description = description;
  }

  set details(details: string) {
    this.props.details = details;
  }

  set uniqueName(uniqueName: string) {
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

  set categories(categories: Category[]) {
    this.props.categories = categories;
  }

  set events(events: Event[]) {
    this.props.events = events;
  }

  set images(images: Image[]) {
    this.props.images = images;
  }

  static async validate(props: ProductProps): Promise<void> {
    const validator = ProductValidatorFactory.create();
    await validator.validate(props);
  }

  static async create(props: ProductProps, uuid?: string): Promise<Product> {
    return new this(props, uuid);
  }

  static async createValidated(
    props: ProductProps,
    uuid?: string,
  ): Promise<Product> {
    await this.validate(props);
    return this.create(props, uuid);
  }
}
