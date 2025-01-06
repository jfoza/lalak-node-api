import { Entity } from '@/common/domain/entities/entity';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { UserTokenType } from '@/features/user/domain/value-objects/user-token-type';

export type UserTokenProps = {
  userUuid: UniqueEntityId;
  token: UniqueEntityId;
  tokenType: UserTokenType;
  createdAt?: Date;
};

export class UserToken extends Entity<UserTokenProps> {
  constructor(
    public readonly props: UserTokenProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get userUuid(): string {
    return this.props.userUuid.toValue();
  }

  get token(): string {
    return this.props.token.toValue();
  }

  get tokenType(): string {
    return this.props.tokenType.toValue();
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static create(
    props: UserTokenProps,
    uniqueEntityId?: UniqueEntityId,
  ): UserToken {
    return new this(props, uniqueEntityId);
  }
}
