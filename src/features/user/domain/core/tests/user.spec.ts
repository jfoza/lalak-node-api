import { User, UserProps } from '@/features/user/domain/core/user';
import { Person } from '@/features/user/domain/core/person';
import { Profile } from '@/features/user/domain/core/profile';
import { AdminUser } from '@/features/user/domain/core/admin-user';
import {
  Customer,
  CustomerProps,
} from '@/features/customer/domain/core/customer';
import { UUID } from '@/common/infra/utils/uuid';
import { BadRequestException } from '@nestjs/common';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';

describe('User Domain Entity Unit Tests', () => {
  let sut: User;
  let props: UserProps;

  beforeEach(async () => {
    props = await UserDataBuilder.getUserProps();
    sut = new User(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.person.name).toEqual(props.person.name);
    expect(sut.props.person.shortName).toEqual(props.person.shortName);
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.personUuid).toEqual(props.personUuid);
    expect(sut.props.profileUuid).toEqual(props.profileUuid);
    expect(sut.props.password).toEqual(props.password);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of personUuid field', () => {
    expect(sut.personUuid).toBeDefined();
    expect(sut.personUuid).toEqual(props.personUuid);
    expect(typeof sut.personUuid).toBe('string');
  });

  it('Getter of profileUuid field', () => {
    expect(sut.profileUuid).toBeDefined();
    expect(sut.profileUuid).toEqual(props.profileUuid);
    expect(typeof sut.profileUuid).toBe('string');
  });

  it('Getter of email field', () => {
    expect(sut.email).toBeDefined();
    expect(sut.email).toEqual(props.email);
    expect(typeof sut.email).toBe('string');
  });

  it('Getter of password field', () => {
    expect(sut.password).toBeDefined();
    expect(sut.password).toEqual(props.password);
    expect(typeof sut.password).toBe('string');
  });

  it('Getter of active field', () => {
    expect(sut.active).toBeDefined();
    expect(sut.active).toEqual(props.active);
    expect(typeof sut.active).toBe('boolean');
  });

  it('Getter of person field', () => {
    expect(sut.person).toBeDefined();
    expect(sut.person).toEqual(props.person);
    expect(sut.person).toBeInstanceOf(Person);
  });

  it('Getter of createdAt field', () => {
    expect(sut.createdAt).toBeDefined();
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of profile field', () => {
    expect(sut.profile).toBeDefined();
    expect(sut.profile).toBeInstanceOf(Profile);
  });

  it('Getter of adminUser field', () => {
    props.adminUser = new AdminUser({
      userUuid: sut.uuid,
    } as CustomerProps);

    expect(sut.adminUser).toBeInstanceOf(AdminUser);
  });

  it('Getter of adminUser field', () => {
    props.adminUser = new Customer({
      userUuid: sut.uuid,
      verifiedEmail: true,
    } as CustomerProps);

    expect(sut.adminUser).toBeInstanceOf(Customer);
  });

  it('Setter of email field', () => {
    sut['email'] = 'new@example.com';
    expect(sut.props.email).toEqual('new@example.com');
    expect(typeof sut.props.email).toBe('string');
  });

  it('Setter of email field', () => {
    const profileUuid = UUID.generate();

    sut['profileUuid'] = profileUuid;
    expect(sut.props.profileUuid).toEqual(profileUuid);
    expect(typeof sut.props.profileUuid).toBe('string');
  });

  it('Setter of password field', () => {
    sut['password'] = 'new-password';
    expect(sut.props.password).toEqual('new-password');
    expect(typeof sut.props.password).toBe('string');
  });

  it('Setter of active field', () => {
    sut['active'] = false;
    expect(sut.props.active).toEqual(false);
    expect(typeof sut.props.active).toBe('boolean');
  });

  it('Setter of person field', () => {
    const person = UserDataBuilder.getPerson();

    sut['person'] = person;
    expect(sut.props.person.uuid).toEqual(person.uuid);
    expect(sut.person).toBeInstanceOf(Person);
  });

  it('Setter of profile field', () => {
    const profile = UserDataBuilder.getAdminMasterProfile();

    sut['profile'] = profile;
    expect(sut.props.profile.uuid).toEqual(profile.uuid);
    expect(sut.profile).toBeInstanceOf(Profile);
  });

  it('createAndValidate method should to instance new User class', async () => {
    const uuid = UUID.generate();
    const userProps = await UserDataBuilder.getUserProps();
    const userClass = await User.createAndValidate(userProps, uuid);

    expect(userClass).toBeInstanceOf(User);
    expect(userClass.uuid).toEqual(uuid);
  });

  it('createAndValidate method should return exception if personUuid is invalid', async () => {
    const userProps = await UserDataBuilder.getUserProps();
    userProps.personUuid = 'invalid';

    await expect(User.createAndValidate(userProps)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('createAndValidate method should return exception if profileUuid is invalid', async () => {
    const userProps = await UserDataBuilder.getUserProps();
    userProps.profileUuid = 'invalid';

    await expect(User.createAndValidate(userProps)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('createAndValidate method should return exception if email is invalid', async () => {
    const userProps = await UserDataBuilder.getUserProps();
    userProps.email = 'invalid';

    await expect(User.createAndValidate(userProps)).rejects.toThrow(
      BadRequestException,
    );
  });
});
