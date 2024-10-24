import { Core } from '@/common/domain/core/core';
import { ProductValidatorFactory } from '@/features/category/domain/validators/product.validator';
import { Category } from '@/features/category/domain/core/category';

export type ProductProps = {
  description: string;
  details?: string;
  uniqueName: string;
  value: number;
  quantity: number;
  balance: number;
  active: boolean;
  createdAt: Date;
  categories?: Category[];
};

export class Product extends Core<ProductProps> {
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

  get createdAt() {
    return this.props.createdAt;
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

  static async validate(props: ProductProps): Promise<void> {
    const validator = ProductValidatorFactory.create();
    await validator.validate(props);
  }

  static async create(props: ProductProps, uuid?: string): Promise<Product> {
    return new this(props, uuid);
  }

  static async createAndValidate(
    props: ProductProps,
    uuid?: string,
  ): Promise<Product> {
    await this.validate(props);
    return this.create(props, uuid);
  }
}
