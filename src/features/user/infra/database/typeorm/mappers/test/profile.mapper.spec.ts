import { UUID } from '@/utils/uuid';
import { ProfileMapper } from '@/features/user/infra/database/typeorm/mappers/profile.mapper';
import { ProfileEntity } from '@/features/user/infra/database/typeorm/entities/profile.entity';
import { ProfileUniqueNameEnum } from '@/utils/enums/profile-unique-name.enum';
import { Profile } from '@/features/user/domain/entities/profile';

describe('ProfileMapper Unit Tests', () => {
  let sut: ProfileMapper;

  beforeEach(async () => {
    sut = new ProfileMapper();
  });

  it('toDomainEntity should return Profile class instance', async () => {
    const profile: ProfileEntity = Object.assign({
      uuid: UUID.generate(),
      description: 'Admin Master',
      unique_name: ProfileUniqueNameEnum.ADMIN_MASTER,
      active: true,
      created_at: new Date(),
    } as ProfileEntity);

    const result = await sut.from(profile);

    expect(result).toBeInstanceOf(Profile);
  });
});
