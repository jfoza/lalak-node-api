import { Entity } from '@/common/domain/entities/entity';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

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

export class Auth extends Entity<AuthProps> {
  constructor(
    public readonly props: AuthProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
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

  static async create(
    props: AuthProps,
    uniqueEntityId?: UniqueEntityId,
  ): Promise<Auth> {
    return new this(props, uniqueEntityId);
  }
}
