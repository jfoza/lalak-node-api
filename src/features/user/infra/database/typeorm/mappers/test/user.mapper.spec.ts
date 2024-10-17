import { UserMapper } from '@/features/user/infra/database/typeorm/mappers/user.mapper';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';
import { UUID } from '@/common/infra/utils/uuid';
import { User } from '@/features/user/domain/core/user';
import { ProfileEntity } from '@/features/user/infra/database/typeorm/entities/profile.entity';
import { PersonEntity } from '@/features/user/infra/database/typeorm/entities/person.entity';
import { AdminUserEntity } from '@/features/user/infra/database/typeorm/entities/admin-user.entity';
import { ProfileUniqueNameEnum } from '@/common/infra/enums/profile-unique-name.enum';

describe('UserMapper Unit Tests', () => {
  let sut: UserMapper;

  beforeEach(async () => {
    sut = new UserMapper();
  });

  it('toDomainEntity should return User class instance', async () => {
    const userEntity: UserEntity = Object.assign({
      uuid: UUID.generate(),
      person_uuid: UUID.generate(),
      profile_uuid: UUID.generate(),
      email: 'user@example.com',
      password: 'pass',
      active: true,
      created_at: new Date(),
    } as UserEntity);

    const result = await sut.from(userEntity);

    expect(result).toBeInstanceOf(User);
  });

  it('toDomainEntity should return User class instance with relations', async () => {
    const person: PersonEntity = Object.assign({
      uuid: UUID.generate(),
      name: 'test',
      short_name: 'TE',
      birth_date: new Date(),
      zip_code: '00000000',
      address: 'test',
      number_address: '00',
      complement: 'test',
      district: 'test',
      uf: 'RS',
      city_uuid: UUID.generate(),
      active: true,
      created_at: new Date(),
    } as PersonEntity);

    const profile: ProfileEntity = Object.assign({
      uuid: UUID.generate(),
      description: 'Admin Master',
      unique_name: ProfileUniqueNameEnum.ADMIN_MASTER,
      active: true,
      created_at: new Date(),
    } as ProfileEntity);

    const adminUser: AdminUserEntity = Object.assign({
      uuid: UUID.generate(),
      user_uuid: UUID.generate(),
      created_at: new Date(),
    } as AdminUserEntity);

    const userEntity: UserEntity = Object.assign({
      uuid: UUID.generate(),
      person_uuid: UUID.generate(),
      profile_uuid: UUID.generate(),
      email: 'user@example.com',
      password: 'pass',
      active: true,
      created_at: new Date(),
      person,
      profile,
      admin_user: adminUser,
    } as UserEntity);

    const result = await sut.from(userEntity);

    expect(result).toBeInstanceOf(User);
  });
});
