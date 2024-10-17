import { UUID } from '@/common/infra/utils/uuid';
import { AdminUserMapper } from '@/features/user/infra/database/typeorm/mappers/admin-user.mapper';
import { AdminUserEntity } from '@/features/user/infra/database/typeorm/entities/admin-user.entity';
import { AdminUser } from '@/features/user/domain/core/admin-user';

describe('AdminUserMapper Unit Tests', () => {
  let sut: AdminUserMapper;

  beforeEach(async () => {
    sut = new AdminUserMapper();
  });

  it('toDomainEntity should return AdminUser class instance', async () => {
    const adminUser: AdminUserEntity = Object.assign({
      uuid: UUID.generate(),
      user_uuid: UUID.generate(),
      created_at: new Date(),
    } as AdminUserEntity);

    const result = await sut.from(adminUser);

    expect(result).toBeInstanceOf(AdminUser);
  });
});
