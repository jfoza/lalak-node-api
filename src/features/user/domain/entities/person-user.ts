import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { Name } from '@/common/domain/value-objects/name';
import { ShortName } from '@/common/domain/value-objects/short-name';
import { BirthDate } from '@/common/domain/value-objects/birth-date';
import { Phone } from '@/common/domain/value-objects/phone';
import { ZipCode } from '@/common/domain/value-objects/zip-code';
import { Address } from '@/common/domain/value-objects/address';
import { Uf } from '@/common/domain/value-objects/uf';
import { Password } from '@/features/user/domain/value-objects/password';
import { Entity } from '@/common/domain/entities/entity';

export type PersonUserProps = {
  userUuid: UniqueEntityId;
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
  createdAt?: Date;
  cityUuid?: UniqueEntityId;
  cityDescription?: string;
  profileUuid?: UniqueEntityId;
  profileDescription?: string;
  profileUniqueName?: string;
};

export class PersonUser extends Entity<PersonUserProps> {
  constructor(
    public readonly props: PersonUserProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get userUuid(): string {
    return this.props.userUuid.toValue();
  }

  get name(): string {
    return this.props.name.toValue();
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password.toValue();
  }

  get shortName(): string {
    return this.props.shortName.toValue();
  }

  get birthDate(): string | null {
    return this.props.birthDate.toString() ?? null;
  }

  get phone(): string | null {
    return this.props.phone.toValue() ?? null;
  }

  get zipCode(): string | null {
    return this.props.zipCode.toValue() ?? null;
  }

  get address(): string | null {
    return this.props.address.toValue() ?? null;
  }

  get numberAddress(): string | null {
    return this.props.numberAddress ?? null;
  }

  get complement(): string | null {
    return this.props.complement ?? null;
  }

  get district(): string | null {
    return this.props.district ?? null;
  }

  get uf(): string | null {
    return this.props.uf.toValue() ?? null;
  }

  get active(): boolean {
    return this.props.active;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get cityUuid(): string | null {
    return this.props.cityUuid.toValue() ?? null;
  }

  get cityDescription(): string | null {
    return this.props.cityDescription ?? null;
  }

  get profileUuid(): string {
    return this.props.profileUuid.toValue();
  }

  get profileDescription(): string {
    return this.props.profileDescription;
  }

  get profileUniqueName(): string {
    return this.props.profileUniqueName;
  }

  set name(value: Name) {
    this.props.name = value;
  }

  set email(value: string) {
    this.props.email = value;
  }

  set shortName(value: ShortName) {
    this.props.shortName = value;
  }

  set birthDate(value: BirthDate) {
    this.props.birthDate = value;
  }

  set phone(value: Phone) {
    this.props.phone = value;
  }

  set zipCode(value: ZipCode) {
    this.props.zipCode = value;
  }

  set address(value: Address) {
    this.props.address = value;
  }

  set numberAddress(value: string) {
    this.props.numberAddress = value;
  }

  set complement(value: string) {
    this.props.complement = value;
  }

  set district(value: string) {
    this.props.district = value;
  }

  set uf(value: Uf) {
    this.props.uf = value;
  }

  set active(value: boolean) {
    this.props.active = value;
  }

  set createdAt(value: Date) {
    this.props.createdAt = value;
  }

  set cityUuid(value: UniqueEntityId) {
    this.props.cityUuid = value;
  }

  set cityDescription(value: string) {
    this.props.cityDescription = value;
  }

  set profileUuid(value: UniqueEntityId) {
    this.props.profileUuid = value;
  }

  set profileDescription(value: string) {
    this.props.profileDescription = value;
  }

  set profileUniqueName(value: string) {
    this.props.profileUniqueName = value;
  }

  static create(
    props: PersonUserProps,
    uniqueEntityId?: UniqueEntityId,
  ): PersonUser {
    return new this(props, uniqueEntityId);
  }
}
