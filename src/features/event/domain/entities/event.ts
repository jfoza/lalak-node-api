import { Entity } from '@/common/domain/entities/entity';
import { Product } from '@/features/product/domain/entities/product';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

export type EventProps = {
  description: string;
  active: boolean;
  createdAt?: Date;
  products?: Product[];
};

export class Event extends Entity<EventProps> {
  private constructor(
    public readonly props: EventProps,
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

  get products(): Product[] {
    return this.props.products;
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

  static create(props: EventProps, uniqueEntityId?: UniqueEntityId): Event {
    return new this(props, uniqueEntityId);
  }
}
