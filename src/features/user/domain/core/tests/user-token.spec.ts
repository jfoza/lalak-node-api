import {
  UserToken,
  UserTokenProps,
} from '@/features/user/domain/core/user-token';
import { UUID } from '@/common/infra/utils/uuid';
import { BadRequestException } from '@nestjs/common';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';

describe('UserToken Domain Entity Unit Tests', () => {
  let sut: UserToken;
  let props: UserTokenProps;

  beforeEach(async () => {
    props = UserDataBuilder.getUserTokenProps();

    sut = new UserToken(props);
  });

  it('Constructor method', async () => {
    expect(sut.props.userUuid).toEqual(props.userUuid);
    expect(sut.props.token).toEqual(props.token);
    expect(sut.props.tokenType).toEqual(props.tokenType);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of userUuid field', () => {
    expect(sut.userUuid).toBeDefined();
    expect(sut.userUuid).toEqual(props.userUuid);
    expect(typeof sut.userUuid).toBe('string');
  });

  it('Getter of token field', () => {
    expect(sut.token).toBeDefined();
    expect(sut.token).toEqual(props.token);
    expect(typeof sut.token).toBe('string');
  });

  it('Getter of tokenType field', () => {
    expect(sut.tokenType).toBeDefined();
    expect(sut.tokenType).toEqual(props.tokenType);
    expect(typeof sut.tokenType).toBe('string');
  });

  it('Getter of createdAt field', () => {
    expect(sut.createdAt).toBeDefined();
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it('createValidated method should to instance new UserToken class', async () => {
    const uuid = UUID.generate();
    const userTokenProps = UserDataBuilder.getUserTokenProps();
    const userTokenClass = await UserToken.createValidated(
      userTokenProps,
      uuid,
    );

    expect(userTokenClass).toBeInstanceOf(UserToken);
    expect(userTokenClass.uuid).toEqual(uuid);
  });

  it('createValidated method should return exception if userUuid field is invalid', async () => {
    const userTokenProps = UserDataBuilder.getUserTokenProps();
    userTokenProps.userUuid = 'invalid';

    await expect(UserToken.createValidated(userTokenProps)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('createValidated method should return exception if token field is invalid', async () => {
    const userTokenProps = UserDataBuilder.getUserTokenProps();
    userTokenProps.token = 'invalid';

    await expect(UserToken.createValidated(userTokenProps)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('createValidated method should return exception if tokenType field is invalid', async () => {
    const userTokenProps = UserDataBuilder.getUserTokenProps();
    userTokenProps.tokenType = 'invalid';

    await expect(UserToken.createValidated(userTokenProps)).rejects.toThrow(
      BadRequestException,
    );
  });
});
