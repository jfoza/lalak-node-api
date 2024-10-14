import { Core } from '@/common/domain/core/core';
import { City } from '@/features/city/domain/core/City';
import { PersonValidatorFactory } from '@/features/user/domain/validators/person.validator';

export type PersonProps = {
  name: string;
  shortName: string;
  birthDate?: string;
  phone?: string;
  zipCode?: string;
  address?: string;
  numberAddress?: string;
  complement?: string;
  district?: string;
  uf?: string;
  cityUuid?: string;
  active: boolean;
  createdAt?: Date;
  city?: City;
};

export class Person extends Core<PersonProps> {
  constructor(
    public readonly props: PersonProps,
    uuid?: string,
  ) {
    super(props, uuid);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get name(): string {
    return this.props.name;
  }

  get shortName(): string {
    return this.props.shortName;
  }

  get birthDate(): string {
    return this.props.birthDate;
  }

  get phone(): string {
    return this.props.phone;
  }

  get zipCode(): string {
    return this.props.zipCode;
  }

  get address(): string {
    return this.props.address;
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
    return this.props.uf;
  }

  get cityUuid(): string {
    return this.props.cityUuid;
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

  set name(name: string) {
    this.props.name = name;
  }

  set shortName(shortName: string) {
    this.props.shortName = shortName;
  }

  set birthDate(birthDate: string) {
    this.props.birthDate = birthDate;
  }

  set phone(phone: string) {
    this.props.phone = phone;
  }

  set zipCode(zipCode: string) {
    this.props.zipCode = zipCode;
  }

  set address(address: string) {
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

  set uf(uf: string) {
    this.props.uf = uf;
  }

  set cityUuid(cityUuid: string) {
    this.props.cityUuid = cityUuid;
  }

  set active(active: boolean) {
    this.props.active = active;
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  set city(city: City) {
    this.props.city = city;
  }

  static async validate(props: PersonProps): Promise<void> {
    const validator = PersonValidatorFactory.create();
    await validator.validate(props);
  }

  static async create(props: PersonProps, uuid?: string): Promise<Person> {
    return new this(props, uuid);
  }

  static async createAndValidate(
    props: PersonProps,
    uuid?: string,
  ): Promise<Person> {
    await this.validate(props);
    return this.create(props, uuid);
  }
}
