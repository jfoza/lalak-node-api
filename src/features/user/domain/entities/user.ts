import { Profile } from '@/features/user/domain/entities/profile';
import { AdminUser } from '@/features/user/domain/entities/admin-user';
import { Customer } from '@/features/user/domain/entities/customer';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { AggregateRoot } from '@/common/domain/entities/aggregate-root';
import { Password } from '@/features/user/domain/value-objects/password';
import { Person } from '@/features/user/domain/entities/person';

export type UserProps = {
  personUuid: UniqueEntityId;
  profileUuid: UniqueEntityId;
  email: string;
  password: Password;
  active: boolean;
  createdAt?: Date;
  person?: Person;
  profile?: Profile;
  adminUser?: AdminUser;
  customer?: Customer;
};

export class User extends AggregateRoot<UserProps> {
  private constructor(
    public readonly props: UserProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get personUuid(): string {
    return this.props.personUuid.toValue();
  }

  get profileUuid(): string {
    return this.props.profileUuid.toValue();
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password.toValue();
  }

  get active(): boolean {
    return this.props.active;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get person(): Person {
    return this.props.person;
  }

  get profile(): Profile {
    return this.props.profile;
  }

  get adminUser(): AdminUser {
    return this.props.adminUser;
  }

  set email(email: string) {
    this.props.email = email;
  }

  set profileUuid(uniqueEntityId: UniqueEntityId) {
    this.props.profileUuid = uniqueEntityId;
  }

  set password(password: Password) {
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

  static create(props: UserProps, uniqueEntityId?: UniqueEntityId): User {
    return new this(props, uniqueEntityId);
  }
}
