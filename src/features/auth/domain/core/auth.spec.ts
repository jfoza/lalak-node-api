import { UUID } from '@/common/infra/utils/uuid';
import { Auth, AuthProps } from '@/features/auth/domain/core/auth';
import { AuthTypesEnum } from '@/common/infra/enums/auth-types.enum';
import { BadRequestException } from '@nestjs/common';

describe('User Domain Entity Unit Tests', () => {
  let sut: Auth;
  let props: AuthProps;

  beforeEach(async () => {
    props = {
      userUuid: UUID.generate(),
      initialDate: new Date(),
      finalDate: new Date(),
      token: UUID.generate(),
      ipAddress: '10.10.1.1',
      authType: AuthTypesEnum.EMAIL_PASSWORD,
      active: true,
      createdAt: new Date(),
    } as AuthProps;

    sut = new Auth(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.userUuid).toEqual(props.userUuid);
    expect(sut.props.initialDate).toEqual(props.initialDate);
    expect(sut.props.finalDate).toEqual(props.finalDate);
    expect(sut.props.token).toEqual(props.token);
    expect(sut.props.ipAddress).toEqual(props.ipAddress);
    expect(sut.props.authType).toEqual(props.authType);
    expect(sut.props.active).toEqual(props.active);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of userUuid field', () => {
    expect(sut.userUuid).toBeDefined();
    expect(sut.userUuid).toEqual(props.userUuid);
    expect(typeof sut.userUuid).toBe('string');
  });

  it('Getter of initialDate field', () => {
    expect(sut.initialDate).toBeDefined();
    expect(sut.initialDate).toBeInstanceOf(Date);
  });

  it('Getter of finalDate field', () => {
    expect(sut.finalDate).toBeDefined();
    expect(sut.finalDate).toBeInstanceOf(Date);
  });

  it('Getter of token field', () => {
    expect(sut.token).toBeDefined();
    expect(sut.token).toEqual(props.token);
    expect(typeof sut.token).toBe('string');
  });

  it('Getter of ipAddress field', () => {
    expect(sut.ipAddress).toBeDefined();
    expect(sut.ipAddress).toEqual(props.ipAddress);
    expect(typeof sut.ipAddress).toBe('string');
  });

  it('Getter of authType field', () => {
    expect(sut.authType).toBeDefined();
    expect(sut.authType).toEqual(props.authType);
    expect(typeof sut.authType).toBe('string');
  });

  it('Getter of active field', () => {
    expect(sut.active).toBeDefined();
    expect(sut.active).toEqual(props.active);
    expect(typeof sut.active).toBe('boolean');
  });

  it('Getter of initialDate field', () => {
    expect(sut.createdAt).toBeDefined();
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it('create method should to instance new Auth class', async () => {
    const authProps = {
      userUuid: UUID.generate(),
      initialDate: new Date(),
      finalDate: new Date(),
      token: UUID.generate(),
      ipAddress: '10.10.1.1',
      authType: AuthTypesEnum.EMAIL_PASSWORD,
      active: true,
      createdAt: new Date(),
    } as AuthProps;

    const authClass = new Auth(authProps);

    expect(authClass).toBeInstanceOf(Auth);
  });

  it('create method should return exception if userUuid is invalid', async () => {
    const authProps = {
      userUuid: 'invalid',
      initialDate: new Date(),
      finalDate: new Date(),
      token: UUID.generate(),
      ipAddress: '10.10.1.1',
      authType: AuthTypesEnum.EMAIL_PASSWORD,
      active: true,
      createdAt: new Date(),
    } as AuthProps;

    await expect(Auth.create(authProps)).rejects.toThrow(BadRequestException);
  });

  it('create method should return exception if authType is invalid', async () => {
    const authProps = {
      userUuid: UUID.generate(),
      initialDate: new Date(),
      finalDate: new Date(),
      token: UUID.generate(),
      ipAddress: '10.10.1.1',
      authType: 'invalid',
      active: true,
      createdAt: new Date(),
    } as AuthProps;

    await expect(Auth.create(authProps)).rejects.toThrow(BadRequestException);
  });
});
