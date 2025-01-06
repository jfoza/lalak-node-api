import {
  UserToken,
  UserTokenProps,
} from '@/features/user/domain/entities/user-token';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

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
    expect(sut.userUuid).toEqual(props.userUuid.toValue());
    expect(typeof sut.userUuid).toBe('string');
  });

  it('Getter of token field', () => {
    expect(sut.token).toBeDefined();
    expect(sut.token).toEqual(props.token.toValue());
    expect(typeof sut.token).toBe('string');
  });

  it('Getter of tokenType field', () => {
    expect(sut.tokenType).toBeDefined();
    expect(sut.tokenType).toEqual(props.tokenType.toValue());
    expect(typeof sut.tokenType).toBe('string');
  });

  it('Getter of createdAt field', () => {
    expect(sut.createdAt).toBeDefined();
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it('create method should to instance new UserToken class', async () => {
    const uniqueEntityId: UniqueEntityId = UniqueEntityId.create();
    const userTokenProps = UserDataBuilder.getUserTokenProps();
    const userTokenClass = UserToken.create(userTokenProps, uniqueEntityId);

    expect(userTokenClass).toBeInstanceOf(UserToken);
    expect(userTokenClass.uuid).toEqual(uniqueEntityId.toValue());
  });
});
