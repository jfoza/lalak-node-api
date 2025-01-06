import { Entity } from '@/common/domain/entities/entity';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

export type ProductEventProps = {
  productUuid: UniqueEntityId;
  eventUuid: UniqueEntityId;
};

export class ProductEvent extends Entity<ProductEventProps> {
  private constructor(
    public readonly props: ProductEventProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
  }

  get productUuid(): string {
    return this.props.productUuid.toValue();
  }

  get eventUuid(): string {
    return this.props.eventUuid.toValue();
  }

  static create(
    props: ProductEventProps,
    uniqueEntityId?: UniqueEntityId,
  ): ProductEvent {
    return new this(props, uniqueEntityId);
  }
}
