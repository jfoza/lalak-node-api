import { Core } from '@/common/domain/core/core';
import { CustomerValidatorFactory } from '@/features/customer/domain/validators/customer.validator';

export type CustomerProps = {
  userUuid: string;
  verifiedEmail: boolean;
  createdAt?: Date;
};

export class Customer extends Core<CustomerProps> {
  constructor(
    public readonly props: CustomerProps,
    uuid?: string,
  ) {
    super(props, uuid);
  }

  get userUuid(): string {
    return this.props.userUuid;
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

  static async validate(props: CustomerProps): Promise<void> {
    const validator = CustomerValidatorFactory.create();
    await validator.validate(props);
  }

  static async create(props: CustomerProps, uuid?: string): Promise<Customer> {
    return new this(props, uuid);
  }

  static async createValidated(
    props: CustomerProps,
    uuid?: string,
  ): Promise<Customer> {
    await this.validate(props);
    return this.create(props, uuid);
  }
}
