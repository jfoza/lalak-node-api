import { Core } from '@/common/domain/core/core';
import { AuthValidatorFactory } from '@/features/auth/domain/validators/auth.validator';

export type AuthProps = {
  userUuid: string;
  initialDate: Date;
  finalDate: Date;
  token: string;
  ipAddress: string;
  authType: string;
  active: boolean;
  createdAt?: Date;
};

export class Auth extends Core<AuthProps> {
  constructor(
    public readonly props: AuthProps,
    uuid?: string,
  ) {
    super(props, uuid);
  }

  static async validate(props: AuthProps): Promise<void> {
    const validator = AuthValidatorFactory.create();
    await validator.validate(props);
  }

  static async create(props: AuthProps, uuid?: string): Promise<Auth> {
    await this.validate(props);
    return new Auth(props, uuid);
  }

  get userUuid(): string {
    return this.props.userUuid;
  }

  get initialDate(): Date {
    return this.props.initialDate;
  }

  get finalDate(): Date {
    return this.props.finalDate;
  }

  get token(): string {
    return this.props.token;
  }

  get ipAddress(): string {
    return this.props.ipAddress;
  }

  get authType(): string {
    return this.props.authType;
  }

  get active(): boolean {
    return this.props.active;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
