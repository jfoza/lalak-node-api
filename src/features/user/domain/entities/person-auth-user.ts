import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { AggregateRoot } from '@/common/domain/entities/aggregate-root';
import { Name } from '@/common/domain/value-objects/name';
import { ShortName } from '@/common/domain/value-objects/short-name';
import { BirthDate } from '@/common/domain/value-objects/birth-date';
import { Phone } from '@/common/domain/value-objects/phone';
import { ZipCode } from '@/common/domain/value-objects/zip-code';
import { Address } from '@/common/domain/value-objects/address';
import { Uf } from '@/common/domain/value-objects/uf';
import { City } from '@/features/city/domain/entities/city';
import { Profile } from '@/features/user/domain/entities/profile';
import { Password } from '@/features/user/domain/value-objects/password';

export type PersonAuthUserProps = {
  name: Name;
  email: string;
  password?: Password;
  shortName: ShortName;
  birthDate?: BirthDate;
  phone?: Phone;
  zipCode?: ZipCode;
  address?: Address;
  numberAddress?: string;
  complement?: string;
  district?: string;
  uf?: Uf;
  active: boolean;
  createdAt: Date;
  city?: City;
  profile?: Profile;
};

export class PersonAuthUser extends AggregateRoot<PersonAuthUserProps> {
  constructor(
    public readonly props: PersonAuthUserProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get name(): string {
    return this.props.name.toValue();
  }

  get email(): string {
    return this.props.email;
  }

  get shortName(): string {
    return this.props.shortName.toValue();
  }

  get birthDate(): string {
    return this.props.birthDate.toString();
  }

  get phone(): string {
    return this.props.phone.toValue();
  }

  get zipCode(): string {
    return this.props.zipCode.toValue();
  }

  get address(): string {
    return this.props.address.toValue();
  }

  get numberAddress(): string {
    return this.props.numberAddress;
  }

  get complement(): string {
    return this.props.complement;
  }

  get district(): string {
    return this.props.district;
  }

  get uf(): string {
    return this.props.uf.toValue();
  }

  get active(): boolean {
    return this.props.active;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get city(): City {
    return this.props.city;
  }

  get profile(): Profile {
    return this.props.profile;
  }

  static create(
    props: PersonAuthUserProps,
    uniqueEntityId?: UniqueEntityId,
  ): PersonAuthUser {
    return new this(props, uniqueEntityId);
  }
}
