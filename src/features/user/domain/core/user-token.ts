import { Core } from '@/common/domain/core/core';
import { UserTokenValidatorFactory } from '@/features/user/domain/validators/user-token.validator';

export type UserTokenProps = {
  userUuid: string;
  token: string;
  tokenType: string;
  createdAt?: Date;
};

export class UserToken extends Core<UserTokenProps> {
  constructor(
    public readonly props: UserTokenProps,
    uuid?: string,
  ) {
    super(props, uuid);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get userUuid(): string {
    return this.props.userUuid;
  }

  get token(): string {
    return this.props.token;
  }

  get tokenType(): string {
    return this.props.tokenType;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static async validate(props: UserTokenProps): Promise<void> {
    const validator = UserTokenValidatorFactory.create();
    await validator.validate(props);
  }

  static async create(
    props: UserTokenProps,
    uuid?: string,
  ): Promise<UserToken> {
    return new this(props, uuid);
  }

  static async createAndValidate(
    props: UserTokenProps,
    uuid?: string,
  ): Promise<UserToken> {
    await this.validate(props);
    return this.create(props, uuid);
  }
}
