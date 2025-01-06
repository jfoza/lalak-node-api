import { User, UserProps } from '@/features/user/domain/entities/user';
import { Profile } from '@/features/user/domain/entities/profile';
import { AdminUser } from '@/features/user/domain/entities/admin-user';
import { CustomerProps } from '@/features/user/domain/entities/customer';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { Password } from '@/features/user/domain/value-objects/password';

describe('User Domain Entity Unit Tests', () => {
  let sut: User;
  let props: UserProps;

  beforeEach(async () => {
    props = await UserDataBuilder.getUserProps();
    sut = new User(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.personUuid).toEqual(props.personUuid);
    expect(sut.props.profileUuid).toEqual(props.profileUuid);
    expect(sut.props.password).toEqual(props.password);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of personUuid field', () => {
    expect(sut.personUuid).toBeDefined();
    expect(sut.personUuid).toEqual(props.personUuid.toValue());
    expect(typeof sut.personUuid).toBe('string');
  });

  it('Getter of profileUuid field', () => {
    expect(sut.profileUuid).toBeDefined();
    expect(sut.profileUuid).toEqual(props.profileUuid.toValue());
    expect(typeof sut.profileUuid).toBe('string');
  });

  it('Getter of email field', () => {
    expect(sut.email).toBeDefined();
    expect(sut.email).toEqual(props.email);
    expect(typeof sut.email).toBe('string');
  });

  it('Getter of password field', () => {
    expect(sut.password).toBeDefined();
    expect(sut.password).toEqual(props.password.toValue());
    expect(typeof sut.password).toBe('string');
  });

  it('Getter of active field', () => {
    expect(sut.active).toBeDefined();
    expect(sut.active).toEqual(props.active);
    expect(typeof sut.active).toBe('boolean');
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
      userUuid: UniqueEntityId.create(sut.uuid),
    } as CustomerProps);

    expect(sut.adminUser).toBeInstanceOf(AdminUser);
  });

  it('Setter of email field', () => {
    sut['email'] = 'new@example.com';
    expect(sut.props.email).toEqual('new@example.com');
    expect(typeof sut.props.email).toBe('string');
  });

  it('Setter of profileUuid field', () => {
    const uniqueEntityId = UniqueEntityId.create();

    sut['profileUuid'] = uniqueEntityId;
    expect(sut.props.profileUuid).toEqual(uniqueEntityId);
    expect(typeof sut.profileUuid).toBe('string');
  });

  it('Setter of password field', async () => {
    sut.password = await Password.createFrom('new-password');
    expect(sut.props.password).toBeInstanceOf(Password);
  });

  it('Setter of active field', () => {
    sut['active'] = false;
    expect(sut.props.active).toEqual(false);
    expect(typeof sut.props.active).toBe('boolean');
  });

  it('Setter of profile field', () => {
    const profile = UserDataBuilder.getAdminMasterProfile();

    sut['profile'] = profile;
    expect(sut.props.profile.uuid).toEqual(profile.uuid);
    expect(sut.profile).toBeInstanceOf(Profile);
  });

  it('create method should to instance new User class', async () => {
    const uniqueEntityId = UniqueEntityId.create();
    const userProps = await UserDataBuilder.getUserProps();
    const userClass = User.create(userProps, uniqueEntityId);

    expect(userClass).toBeInstanceOf(User);
    expect(userClass.uuid).toEqual(uniqueEntityId.toValue());
  });
});
