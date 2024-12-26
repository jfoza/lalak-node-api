import { Core } from '@/common/domain/core/core';
import { ProfileValidatorFactory } from '@/features/user/domain/validators/profile.validator';

export type ProfileProps = {
  description: string;
  uniqueName: string;
  createdAt?: Date;
};

export class Profile extends Core<ProfileProps> {
  constructor(
    public readonly props: ProfileProps,
    uuid?: string,
  ) {
    super(props, uuid);
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

  static async validate(props: ProfileProps): Promise<void> {
    const validator = ProfileValidatorFactory.create();
    await validator.validate(props);
  }

  static async create(props: ProfileProps, uuid?: string): Promise<Profile> {
    return new this(props, uuid);
  }

  static async createValidated(
    props: ProfileProps,
    uuid?: string,
  ): Promise<Profile> {
    await this.validate(props);
    return this.create(props, uuid);
  }
}
