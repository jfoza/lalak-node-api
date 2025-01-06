import { Entity } from '@/common/domain/entities/entity';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

export type ProfileProps = {
  description: string;
  uniqueName: string;
  createdAt?: Date;
};

export class Profile extends Entity<ProfileProps> {
  constructor(
    public readonly props: ProfileProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get description(): string {
    return this.props.description;
  }

  get uniqueName(): string {
    return this.props.uniqueName;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static create(props: ProfileProps, uniqueEntityId?: UniqueEntityId): Profile {
    return new this(props, uniqueEntityId);
  }
}
