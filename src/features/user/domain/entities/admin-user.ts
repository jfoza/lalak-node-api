import { Entity } from '@/common/domain/entities/entity';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

export type AdminUserProps = {
  userUuid: UniqueEntityId;
  createdAt?: Date;
};

export class AdminUser extends Entity<AdminUserProps> {
  private constructor(
    public readonly props: AdminUserProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get userUuid(): string {
    return this.props.userUuid.toValue();
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static create(
    props: AdminUserProps,
    uniqueEntityId?: UniqueEntityId,
  ): AdminUser {
    return new this(props, uniqueEntityId);
  }
}
