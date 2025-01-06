import { Entity } from '@/common/domain/entities/entity';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

export type ProductImageProps = {
  productUuid: UniqueEntityId;
  imageUuid: UniqueEntityId;
};

export class ProductImage extends Entity<ProductImageProps> {
  private constructor(
    public readonly props: ProductImageProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
  }

  get productUuid(): string {
    return this.props.productUuid.toValue();
  }

  get imageUuid(): string {
    return this.props.imageUuid.toValue();
  }

  static create(
    props: ProductImageProps,
    uniqueEntityId?: UniqueEntityId,
  ): ProductImage {
    return new this(props, uniqueEntityId);
  }
}
