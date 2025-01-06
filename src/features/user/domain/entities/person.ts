import { City } from '@/features/city/domain/entities/city';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { ShortName } from '@/common/domain/value-objects/short-name';
import { BirthDate } from '@/common/domain/value-objects/birth-date';
import { Phone } from '@/common/domain/value-objects/phone';
import { ZipCode } from '@/common/domain/value-objects/zip-code';
import { Address } from '@/common/domain/value-objects/address';
import { AggregateRoot } from '@/common/domain/entities/aggregate-root';
import { User } from '@/features/user/domain/entities/user';
import { Name } from '@/common/domain/value-objects/name';
import { Uf } from '@/common/domain/value-objects/uf';

export type PersonProps = {
  name: Name;
  shortName: ShortName;
  birthDate?: BirthDate;
  phone?: Phone;
  zipCode?: ZipCode;
  address?: Address;
  numberAddress?: string;
  complement?: string;
  district?: string;
  uf?: Uf;
  cityUuid?: UniqueEntityId;
  active: boolean;
  createdAt?: Date;
  city?: City;
  user?: User;
};

export class Person extends AggregateRoot<PersonProps> {
  constructor(
    public readonly props: PersonProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get name(): string {
    return this.props.name.toValue();
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

  get cityUuid(): string {
    return this.props.cityUuid.toValue();
  }

  get active(): boolean {
    return this.props.active;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get user(): User {
    return this.props.user;
  }

  get city(): City {
    return this.props.city;
  }

  set name(name: Name) {
    this.props.name = name;
  }

  set shortName(shortName: ShortName) {
    this.props.shortName = shortName;
  }

  set birthDate(birthDate: BirthDate) {
    this.props.birthDate = birthDate;
  }

  set phone(phone: Phone) {
    this.props.phone = phone;
  }

  set zipCode(zipCode: ZipCode) {
    this.props.zipCode = zipCode;
  }

  set address(address: Address) {
    this.props.address = address;
  }

  set numberAddress(numberAddress: string) {
    this.props.numberAddress = numberAddress;
  }

  set complement(complement: string) {
    this.props.complement = complement;
  }

  set district(district: string) {
    this.props.district = district;
  }

  set uf(uf: Uf) {
    this.props.uf = uf;
  }

  set cityUuid(cityUuid: UniqueEntityId) {
    this.props.cityUuid = cityUuid;
  }

  set active(active: boolean) {
    this.props.active = active;
  }

  set city(city: City) {
    this.props.city = city;
  }

  set user(user: User) {
    this.props.user = user;
  }

  static create(props: PersonProps, uniqueEntityId?: UniqueEntityId): Person {
    return new this(props, uniqueEntityId);
  }
}
