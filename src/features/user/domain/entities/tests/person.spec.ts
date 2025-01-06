import { Person, PersonProps } from '@/features/user/domain/entities/person';
import { City, CityProps } from '@/features/city/domain/entities/city';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { Name } from '@/common/domain/value-objects/name';
import { ShortName } from '@/common/domain/value-objects/short-name';
import { BirthDate } from '@/common/domain/value-objects/birth-date';
import { Phone } from '@/common/domain/value-objects/phone';
import { ZipCode } from '@/common/domain/value-objects/zip-code';
import { Uf } from '@/common/domain/value-objects/uf';
import { BrazilianStates } from '@/utils/enums/brazilian-states.enum';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { Address } from '@/common/domain/value-objects/address';

describe('Person Domain Entity Unit Tests', () => {
  let sut: Person;
  let props: PersonProps;

  beforeEach(async () => {
    props = await UserDataBuilder.getPersonProps();

    sut = new Person(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.shortName).toEqual(props.shortName);
    expect(sut.props.birthDate).toEqual(props.birthDate);
    expect(sut.props.phone).toEqual(props.phone);
    expect(sut.props.zipCode).toEqual(props.zipCode);
    expect(sut.props.address).toEqual(props.address);
    expect(sut.props.numberAddress).toEqual(props.numberAddress);
    expect(sut.props.complement).toEqual(props.complement);
    expect(sut.props.district).toEqual(props.district);
    expect(sut.props.uf).toEqual(props.uf);
    expect(sut.props.cityUuid).toEqual(props.cityUuid);
    expect(sut.props.active).toEqual(props.active);
    expect(sut.props.city).toEqual(props.city);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of name field', () => {
    expect(sut.name).toBeDefined();
    expect(sut.name).toEqual(props.name.toValue());
    expect(typeof sut.name).toBe('string');
  });

  it('Getter of shortName field', () => {
    expect(sut.shortName).toBeDefined();
    expect(sut.shortName).toEqual(props.shortName.toValue());
    expect(typeof sut.shortName).toBe('string');
  });

  it('Getter of birthDate field', () => {
    expect(sut.birthDate).toBeDefined();
    expect(sut.birthDate).toEqual(props.birthDate.toString());
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of phone field', () => {
    expect(sut.phone).toBeDefined();
    expect(sut.phone).toEqual(props.phone.toValue());
    expect(typeof sut.shortName).toBe('string');
  });

  it('Getter of zipCode field', () => {
    expect(sut.zipCode).toBeDefined();
    expect(sut.zipCode).toEqual(props.zipCode.toValue());
    expect(typeof sut.shortName).toBe('string');
  });

  it('Getter of address field', () => {
    expect(sut.address).toBeDefined();
    expect(sut.address).toEqual(props.address.toValue());
    expect(typeof sut.address).toBe('string');
  });

  it('Getter of numberAddress field', () => {
    expect(sut.numberAddress).toBeDefined();
    expect(sut.numberAddress).toEqual(props.numberAddress);
    expect(typeof sut.numberAddress).toBe('string');
  });

  it('Getter of complement field', () => {
    expect(sut.complement).toBeDefined();
    expect(sut.complement).toEqual(props.complement);
    expect(typeof sut.complement).toBe('string');
  });

  it('Getter of district field', () => {
    expect(sut.district).toBeDefined();
    expect(sut.district).toEqual(props.district);
    expect(typeof sut.district).toBe('string');
  });

  it('Getter of uf field', () => {
    expect(sut.uf).toBeDefined();
    expect(sut.uf).toEqual(props.uf.toValue());
    expect(typeof sut.uf).toBe('string');
  });

  it('Getter of cityUuid field', () => {
    expect(sut.cityUuid).toBeDefined();
    expect(sut.cityUuid).toEqual(props.cityUuid.toValue());
    expect(typeof sut.cityUuid).toBe('string');
  });

  it('Getter of active field', () => {
    expect(sut.active).toBeDefined();
    expect(sut.active).toEqual(props.active);
    expect(typeof sut.active).toBe('boolean');
  });

  it('Getter of city field', () => {
    expect(sut.city).toBeDefined();
    expect(sut.city).toEqual(props.city);
    expect(sut.city).toBeInstanceOf(City);
  });

  it('Getter of createdAt field', () => {
    expect(sut.createdAt).toBeDefined();
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it('Setter of name field', () => {
    const name = Name.createFrom('new name');

    sut['name'] = name;
    expect(sut.props.name).toEqual(name);
    expect(sut.props.name).toBeInstanceOf(Name);
    expect(typeof sut.name).toBe('string');
  });

  it('Setter of shortName field', () => {
    const shortName = ShortName.createFrom('new shortName');

    sut['shortName'] = shortName;
    expect(sut.props.shortName).toEqual(shortName);
    expect(sut.props.shortName).toBeInstanceOf(ShortName);
    expect(typeof sut.shortName).toBe('string');
  });

  it('Setter of birthDate field', () => {
    const birthDate = BirthDate.createFrom(new Date());

    sut['birthDate'] = birthDate;
    expect(sut.props.birthDate).toEqual(birthDate);
    expect(typeof sut.birthDate).toBe('string');
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it('Setter of phone field', () => {
    const phone = Phone.createFrom('54000000000');

    sut['phone'] = phone;
    expect(sut.props.phone).toEqual(phone);
    expect(sut.props.phone).toBeInstanceOf(Phone);
    expect(typeof sut.phone).toBe('string');
  });

  it('Setter of zipCode field', () => {
    const zipCode = ZipCode.createFrom('00000000');

    sut['zipCode'] = zipCode;
    expect(sut.props.zipCode).toEqual(zipCode);
    expect(sut.props.zipCode).toBeInstanceOf(ZipCode);
    expect(typeof sut.zipCode).toBe('string');
  });

  it('Setter of address field', () => {
    const address = Address.createFrom('address');

    sut['address'] = address;
    expect(sut.props.address).toEqual(address);
    expect(sut.props.address).toBeInstanceOf(Address);
    expect(typeof sut.address).toBe('string');
  });

  it('Setter of numberAddress field', () => {
    sut['numberAddress'] = '22';
    expect(sut.props.numberAddress).toEqual('22');
    expect(typeof sut.props.numberAddress).toBe('string');
  });

  it('Setter of complement field', () => {
    sut['complement'] = 'complement';
    expect(sut.props.complement).toEqual('complement');
    expect(typeof sut.props.complement).toBe('string');
  });

  it('Setter of district field', () => {
    sut['district'] = 'district';
    expect(sut.props.district).toEqual('district');
    expect(typeof sut.props.district).toBe('string');
  });

  it('Setter of uf field', () => {
    const uf = Uf.create(BrazilianStates.AL);

    sut['uf'] = uf;
    expect(sut.props.uf).toEqual(uf);
    expect(sut.props.uf).toBeInstanceOf(Uf);
    expect(typeof sut.uf).toBe('string');
  });

  it('Setter of cityUuid field', () => {
    const uniqueEntityId = UniqueEntityId.create();

    sut['cityUuid'] = uniqueEntityId;
    expect(sut.props.cityUuid).toEqual(uniqueEntityId);
    expect(sut.props.cityUuid).toBeInstanceOf(UniqueEntityId);
    expect(typeof sut.cityUuid).toBe('string');
  });

  it('Setter of active field', () => {
    sut['active'] = false;
    expect(sut.props.active).toEqual(false);
    expect(typeof sut.props.active).toBe('boolean');
  });

  it('Setter of city field', () => {
    const uf = Uf.create(BrazilianStates.AL);

    const city = new City({
      description: 'test',
      uf,
    } as CityProps);

    sut['city'] = city;
    expect(sut.props.city.uuid).toEqual(city.uuid);
    expect(sut.props.city).toBeInstanceOf(City);
  });

  it('create method should to instance new Person class', async () => {
    const uniqueEntityId = UniqueEntityId.create();
    const personProps = await UserDataBuilder.getPersonProps();
    const personClass = Person.create(personProps, uniqueEntityId);

    expect(personClass).toBeInstanceOf(Person);
    expect(personClass.uuid).toEqual(uniqueEntityId.toValue());
  });
});
