import { vi } from 'vitest';
import { IAdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository.interface';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { Policy } from '@/acl/domain/core/policy';
import { AdminUserListByIdUseCase } from '@/features/user/application/use-cases/admin-user-list-by-id.use-case';
import { v4 as uuid4 } from 'uuid';
import { User } from '@/features/user/domain/core/user';
import { Profile } from '@/features/user/domain/core/profile';
import { ProfileUniqueNameEnum } from '@/common/infra/enums/profile-unique-name.enum';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

describe('Admin User List By Id UseCase', () => {
  let sut: AdminUserListByIdUseCase;
  const uuid = uuid4();

  const adminUserRepository = {
    findByUserUuid: vi.fn(async () => null),
  } as unknown as IAdminUserRepository;

  beforeEach(() => {
    sut = new AdminUserListByIdUseCase(adminUserRepository);

    (sut as any).policy = new Policy();
  });

  it.each([
    {
      rule: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_VIEW,
      profile: {
        description: 'Admin Master',
        uniqueName: ProfileUniqueNameEnum.ADMIN_MASTER,
      },
    },
    {
      rule: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_VIEW,
      profile: {
        description: 'Employee',
        uniqueName: ProfileUniqueNameEnum.EMPLOYEE,
      },
    },
  ])('should to list admin user id by ability', async ({ rule, profile }) => {
    sut.setAbilities([rule]);

    const user = new User();
    user.profile = new Profile(profile.description, profile.uniqueName);

    adminUserRepository.findByUserUuid = vi.fn(async () => user);

    const result = await sut.execute(uuid);

    expect(adminUserRepository.findByUserUuid).toHaveBeenCalled();
    expect(result).toBeInstanceOf(User);
  });

  it.each([
    {
      rule: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_VIEW,
      profile: {
        description: 'Customer',
        uniqueName: ProfileUniqueNameEnum.CUSTOMER,
      },
    },
    {
      rule: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_VIEW,
      profile: {
        description: 'Customer',
        uniqueName: ProfileUniqueNameEnum.CUSTOMER,
      },
    },
  ])(
    'should return exception if user is not reachable because of disallowed profile',
    async ({ rule, profile }) => {
      sut.setAbilities([rule]);

      const user = new User();
      user.profile = new Profile(profile.description, profile.uniqueName);

      adminUserRepository.findByUserUuid = vi.fn(async () => user);

      await expect(sut.execute(uuid)).rejects.toThrow(ForbiddenException);
      await expect(sut.execute(uuid)).rejects.toThrow(
        ErrorMessagesEnum.USER_NOT_ALLOWED,
      );
    },
  );

  it.each([
    {
      rule: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_VIEW,
    },
    {
      rule: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_VIEW,
    },
  ])('should return exception if admin user not exists', async ({ rule }) => {
    sut.setAbilities([rule]);

    adminUserRepository.findByUserUuid = vi.fn(async () => null);

    await expect(sut.execute(uuid)).rejects.toThrow(NotFoundException);
    await expect(sut.execute(uuid)).rejects.toThrow(
      ErrorMessagesEnum.USER_NOT_FOUND,
    );
  });
});
