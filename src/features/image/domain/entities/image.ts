import { Entity } from '@/common/domain/entities/entity';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

export type ImageProps = {
  path: string;
  type: string;
  createdAt?: Date;
};

export class Image extends Entity<ImageProps> {
  constructor(
    public readonly props: ImageProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get path(): string {
    return this.props.path;
  }

  get type(): string {
    return this.props.type;
  }

  get createdAt(): Date {
    return this.props.createdAt ?? new Date();
  }

  static async create(
    props: ImageProps,
    uniqueEntityId?: UniqueEntityId,
  ): Promise<Image> {
    return new this(props, uniqueEntityId);
  }
}
