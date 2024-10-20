import { UUID } from '@/common/infra/utils/uuid';
import { UserTokenMapper } from '@/features/user/infra/database/typeorm/mappers/user-token.mapper';
import { UserToken } from '@/features/user/domain/core/user-token';
import { UserTokenEntity } from '@/features/user/infra/database/typeorm/entities/user-token.entity';
import { TokenTypesEnum } from '@/common/infra/enums/token-types.enum';

describe('UserTokenMapper Unit Tests', () => {
  let sut: UserTokenMapper;

  beforeEach(async () => {
    sut = new UserTokenMapper();
  });

  it('toDomainEntity should return UserToken class instance', async () => {
    const userToken: UserTokenEntity = Object.assign({
      uuid: UUID.generate(),
      user_uuid: UUID.generate(),
      token: UUID.generate(),
      token_type: TokenTypesEnum.FORGOT_PASSWORD,
      created_at: new Date(),
    } as UserTokenEntity);

    const result = await sut.from(userToken);

    expect(result).toBeInstanceOf(UserToken);
  });
});
