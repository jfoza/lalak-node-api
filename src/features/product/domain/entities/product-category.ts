import { Entity } from '@/common/domain/entities/entity';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

export type ProductCategoryProps = {
  productUuid: UniqueEntityId;
  categoryUuid: UniqueEntityId;
};

export class ProductCategory extends Entity<ProductCategoryProps> {
  private constructor(
    public readonly props: ProductCategoryProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
  }

  get productUuid(): string {
    return this.props.productUuid.toValue();
  }

  get categoryUuid(): string {
    return this.props.categoryUuid.toValue();
  }

  static create(
    props: ProductCategoryProps,
    uniqueEntityId?: UniqueEntityId,
  ): ProductCategory {
    return new this(props, uniqueEntityId);
  }
}
