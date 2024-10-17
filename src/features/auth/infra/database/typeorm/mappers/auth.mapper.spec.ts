import { UUID } from '@/common/infra/utils/uuid';
import { AuthMapper } from '@/features/auth/infra/database/typeorm/mappers/auth.mapper';
import { AuthEntity } from '@/features/auth/infra/database/typeorm/entities/auth.entity';
import { AuthTypesEnum } from '@/common/infra/enums/auth-types.enum';
import { Auth } from '@/features/auth/domain/core/auth';

describe('AuthMapper Unit Tests', () => {
  let sut: AuthMapper;

  beforeEach(async () => {
    sut = new AuthMapper();
  });

  it('toDomainEntity should return AuthMapper class instance', async () => {
    const authEntity: AuthEntity = Object.assign({
      uuid: UUID.generate(),
      user_uuid: UUID.generate(),
      initial_date: new Date(),
      final_date: new Date(),
      token: UUID.generate(),
      ip_address: '10.10.1.1',
      auth_type: AuthTypesEnum.EMAIL_PASSWORD,
    } as AuthEntity);

    const result = await sut.from(authEntity);

    expect(result).toBeInstanceOf(Auth);
  });
});
