import { Core } from '@/common/domain/core/core';
import { AdminUserValidatorFactory } from '@/features/user/domain/validators/admin-user.validator';

export type AdminUserProps = {
  userUuid: string;
  createdAt?: Date;
};

export class AdminUser extends Core<AdminUserProps> {
  constructor(
    public readonly props: AdminUserProps,
    uuid?: string,
  ) {
    super(props, uuid);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get userUuid(): string {
    return this.props.userUuid;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static async validate(props: AdminUserProps): Promise<void> {
    const validator = AdminUserValidatorFactory.create();
    await validator.validate(props);
  }

  static async create(
    props: AdminUserProps,
    uuid?: string,
  ): Promise<AdminUser> {
    return new this(props, uuid);
  }

  static async createValidated(
    props: AdminUserProps,
    uuid?: string,
  ): Promise<AdminUser> {
    await this.validate(props);
    return this.create(props, uuid);
  }
}
