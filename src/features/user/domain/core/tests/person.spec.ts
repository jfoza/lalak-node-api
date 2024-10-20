import { Person, PersonProps } from '@/features/user/domain/core/person';
import { City, CityProps } from '@/features/city/domain/core/city';
import { UUID } from '@/common/infra/utils/uuid';
import { BadRequestException } from '@nestjs/common';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';

describe('Person Domain Entity Unit Tests', () => {
  let sut: Person;
  let props: PersonProps;

  beforeEach(async () => {
    props = UserDataBuilder.getPersonProps();

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
    expect(sut.name).toEqual(props.name);
    expect(typeof sut.name).toBe('string');
  });

  it('Getter of shortName field', () => {
    expect(sut.shortName).toBeDefined();
    expect(sut.shortName).toEqual(props.shortName);
    expect(typeof sut.shortName).toBe('string');
  });

  it('Getter of birthDate field', () => {
    expect(sut.birthDate).toBeDefined();
    expect(sut.birthDate).toEqual(props.birthDate);
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of phone field', () => {
    expect(sut.phone).toBeDefined();
    expect(sut.phone).toEqual(props.phone);
    expect(typeof sut.shortName).toBe('string');
  });

  it('Getter of zipCode field', () => {
    expect(sut.zipCode).toBeDefined();
    expect(sut.zipCode).toEqual(props.zipCode);
    expect(typeof sut.shortName).toBe('string');
  });

  it('Getter of address field', () => {
    expect(sut.address).toBeDefined();
    expect(sut.address).toEqual(props.address);
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
    expect(sut.uf).toEqual(props.uf);
    expect(typeof sut.uf).toBe('string');
  });

  it('Getter of cityUuid field', () => {
    expect(sut.cityUuid).toBeDefined();
    expect(sut.cityUuid).toEqual(props.cityUuid);
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
    sut['name'] = 'new name';
    expect(sut.props.name).toEqual('new name');
    expect(typeof sut.props.name).toBe('string');
  });

  it('Setter of shortName field', () => {
    sut['shortName'] = 'new shortName';
    expect(sut.props.shortName).toEqual('new shortName');
    expect(typeof sut.props.shortName).toBe('string');
  });

  it('Setter of birthDate field', () => {
    sut['birthDate'] = '2000-02-15';
    expect(sut.props.birthDate).toEqual('2000-02-15');
    expect(typeof sut.props.birthDate).toBe('string');
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it('Setter of phone field', () => {
    sut['phone'] = '54000000000';
    expect(sut.props.phone).toEqual('54000000000');
    expect(typeof sut.props.phone).toBe('string');
  });

  it('Setter of zipCode field', () => {
    sut['zipCode'] = '00000000';
    expect(sut.props.zipCode).toEqual('00000000');
    expect(typeof sut.props.zipCode).toBe('string');
  });

  it('Setter of address field', () => {
    sut['address'] = 'address';
    expect(sut.props.address).toEqual('address');
    expect(typeof sut.props.address).toBe('string');
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
    sut['uf'] = 'BA';
    expect(sut.props.uf).toEqual('BA');
    expect(typeof sut.props.uf).toBe('string');
  });

  it('Setter of cityUuid field', () => {
    const uuid = UUID.generate();

    sut['cityUuid'] = uuid;
    expect(sut.props.cityUuid).toEqual(uuid);
    expect(typeof sut.props.cityUuid).toBe('string');
  });

  it('Setter of active field', () => {
    sut['active'] = false;
    expect(sut.props.active).toEqual(false);
    expect(typeof sut.props.active).toBe('boolean');
  });

  it('Setter of city field', () => {
    const city = new City({
      description: 'test',
      uf: 'RS',
    } as CityProps);

    sut['city'] = city;
    expect(sut.props.city.uuid).toEqual(city.uuid);
    expect(sut.props.city).toBeInstanceOf(City);
  });

  it('createAndValidate method should to instance new Person class', async () => {
    const uuid = UUID.generate();
    const personProps = UserDataBuilder.getPersonProps();
    const personClass = await Person.createAndValidate(personProps, uuid);

    expect(personClass).toBeInstanceOf(Person);
    expect(personClass.uuid).toEqual(uuid);
  });

  it('createAndValidate method should return exception if birthDate field is invalid', async () => {
    const personProps = UserDataBuilder.getPersonProps();
    personProps.birthDate = 'invalid';

    await expect(Person.createAndValidate(personProps)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('createAndValidate method should return exception if phone field is invalid', async () => {
    const personProps = UserDataBuilder.getPersonProps();
    personProps.phone = '51999';

    await expect(Person.createAndValidate(personProps)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('createAndValidate method should return exception if zipCode field is invalid', async () => {
    const personProps = UserDataBuilder.getPersonProps();
    personProps.zipCode = '0000';

    await expect(Person.createAndValidate(personProps)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('createAndValidate method should return exception if uf field is invalid', async () => {
    const personProps = UserDataBuilder.getPersonProps();
    personProps.uf = 'abc';

    await expect(Person.createAndValidate(personProps)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('createAndValidate method should return exception if cityUuid field is invalid', async () => {
    const personProps = UserDataBuilder.getPersonProps();
    personProps.cityUuid = 'invalid';

    await expect(Person.createAndValidate(personProps)).rejects.toThrow(
      BadRequestException,
    );
  });
});
