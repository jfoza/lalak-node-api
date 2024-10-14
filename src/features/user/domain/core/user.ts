import { Core } from '@/common/domain/core/core';
import { Profile } from '@/features/user/domain/core/profile';
import { Person } from '@/features/user/domain/core/person';
import { AdminUser } from '@/features/user/domain/core/admin-user';
import { Customer } from '@/features/customer/domain/core/customer';
import { UserValidatorFactory } from '@/features/user/domain/validators/user.validator';

export type UserProps = {
  personUuid: string;
  profileUuid: string;
  email: string;
  password: string;
  active: boolean;
  createdAt?: Date;
  profile: Profile;
  person: Person;
  adminUser?: AdminUser;
  customer?: Customer;
};

export class User extends Core<UserProps> {
  constructor(
    public readonly props: UserProps,
    uuid?: string,
  ) {
    super(props, uuid);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get personUuid(): string {
    return this.props.personUuid;
  }

  get profileUuid(): string {
    return this.props.profileUuid;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get active(): boolean {
    return this.props.active;
  }

  get person(): Person {
    return this.props.person;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get profile(): Profile {
    return this.props.profile;
  }

  get adminUser(): AdminUser {
    return this.props.adminUser;
  }

  get customer(): Customer {
    return this.props.customer;
  }

  set email(email: string) {
    this.props.email = email;
  }

  set profileUuid(profileUuid: string) {
    this.props.profileUuid = profileUuid;
  }

  set password(password: string) {
    this.props.password = password;
  }

  set active(active: boolean) {
    this.props.active = active;
  }

  set person(person: Person) {
    this.props.person = person;
  }

  set profile(profile: Profile) {
    this.props.profile = profile;
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  static async validate(props: UserProps): Promise<void> {
    const validator = UserValidatorFactory.create();
    await validator.validate(props);
  }

  static async create(props: UserProps, uuid?: string): Promise<User> {
    return new this(props, uuid);
  }

  static async createAndValidate(
    props: UserProps,
    uuid?: string,
  ): Promise<User> {
    await this.validate(props);
    return this.create(props, uuid);
  }
}
