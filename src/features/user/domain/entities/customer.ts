import { Entity } from '@/common/domain/entities/entity';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

export type CustomerProps = {
  userUuid: UniqueEntityId;
  verifiedEmail: boolean;
  createdAt?: Date;
};

export class Customer extends Entity<CustomerProps> {
  private constructor(
    public readonly props: CustomerProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
  }

  get userUuid(): string {
    return this.props.userUuid.toValue();
  }

  get verifiedEmail(): boolean {
    return this.props.verifiedEmail;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set verifiedEmail(verifiedEmail: boolean) {
    this.props.verifiedEmail = verifiedEmail;
  }

  static create(
    props: CustomerProps,
    uniqueEntityId?: UniqueEntityId,
  ): Customer {
    return new this(props, uniqueEntityId);
  }
}
