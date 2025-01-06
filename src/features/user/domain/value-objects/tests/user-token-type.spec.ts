import { UserTokenType } from '@/features/user/domain/value-objects/user-token-type';
import { TokenTypesEnum } from '@/utils/enums/token-types.enum';

describe('UserTokenType Value Object Unit Tests', () => {
  let sut: UserTokenType;

  beforeEach(async () => {
    sut = UserTokenType.create(TokenTypesEnum.FORGOT_PASSWORD);
  });

  it('toValue method', async () => {
    expect(sut.toValue()).toEqual(TokenTypesEnum.FORGOT_PASSWORD);
  });

  it('create method should to instance new UserTokenType class', async () => {
    const userTokenType = UserTokenType.create(TokenTypesEnum.FORGOT_PASSWORD);

    expect(userTokenType).toBeInstanceOf(UserTokenType);
  });
});
