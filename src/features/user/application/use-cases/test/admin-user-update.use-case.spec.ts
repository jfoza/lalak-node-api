import { vi } from 'vitest';
import { IPersonRepository } from '@/features/user/domain/repositories/person-repository.interface';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { IAdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository.interface';
import { IProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';
import { v4 as uuid4 } from 'uuid';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { Profile } from '@/features/user/domain/core/profile';
import { User } from '@/features/user/domain/core/user';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { Policy } from '@/acl/domain/core/policy';
import { Person } from '@/features/user/domain/core/person';
import { AdminUser } from '@/features/user/domain/core/admin-user';
import { ProfileUniqueNameEnum } from '@/common/infra/enums/profile-unique-name.enum';
import { AdminUserUpdateUseCase } from '@/features/user/application/use-cases/admin-user-update.use-case';
import { UpdateAdminUserDto } from '@/features/user/application/dto/update-admin-user.dto';

describe('Admin User Update UseCase', () => {
  let sut: AdminUserUpdateUseCase;
  let updateAdminUserDto: UpdateAdminUserDto;

  const personRepository = {
    update: vi.fn(async () => new Person()),
  } as unknown as IPersonRepository;

  const userRepository = {
    update: vi.fn(async () => new User()),
    updatePassword: vi.fn(),
  } as unknown as IUserRepository;

  const adminUserRepository = {
    update: vi.fn(async () => new AdminUser()),
  } as unknown as IAdminUserRepository;

  const profileRepository = {
    findById: vi.fn(async () => null),
  } as unknown as IProfileRepository;

  beforeEach(() => {
    sut = new AdminUserUpdateUseCase(
      personRepository,
      userRepository,
      adminUserRepository,
      profileRepository,
    );

    (sut as any).policy = new Policy();

    updateAdminUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      profileUuid: uuid4(),
    } as UpdateAdminUserDto;
  });

  it.each([
    {
      rule: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_UPDATE,
      profile: {
        description: 'Admin Master',
        uniqueName: ProfileUniqueNameEnum.ADMIN_MASTER,
      },
    },
    {
      rule: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_UPDATE,
      profile: {
        description: 'Employee',
        uniqueName: ProfileUniqueNameEnum.EMPLOYEE,
      },
    },
  ])('should to update admin user by abilities', async ({ rule, profile }) => {
    sut.setAbilities([rule]);

    const user = new User();
    user.profile = new Profile(profile.description, profile.uniqueName);
    user.person = new Person('John Doe', 'JO');

    adminUserRepository.findByUserUuid = vi.fn(async () => user);

    userRepository.findByEmail = vi.fn(async () => null);

    profileRepository.findById = vi.fn(
      async () => new Profile(profile.description, profile.uniqueName),
    );

    const result = await sut.execute(uuid4(), updateAdminUserDto);

    expect(personRepository.update).toHaveBeenCalled();
    expect(userRepository.update).toHaveBeenCalled();
    expect(result).toBeInstanceOf(User);
  });

  it.each([
    {
      rule: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_UPDATE,
      profile: {
        description: 'Admin Master',
        uniqueName: ProfileUniqueNameEnum.ADMIN_MASTER,
      },
    },
    {
      rule: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_UPDATE,
      profile: {
        description: 'Employee',
        uniqueName: ProfileUniqueNameEnum.EMPLOYEE,
      },
    },
  ])(
    'should return exception if admin user not exists',
    async ({ rule, profile }) => {
      sut.setAbilities([rule]);

      adminUserRepository.findByUserUuid = vi.fn(async () => null);

      profileRepository.findById = vi.fn(
        async () => new Profile(profile.description, profile.uniqueName),
      );

      await expect(sut.execute(uuid4(), updateAdminUserDto)).rejects.toThrow(
        NotFoundException,
      );
      await expect(sut.execute(uuid4(), updateAdminUserDto)).rejects.toThrow(
        ErrorMessagesEnum.USER_NOT_FOUND,
      );
    },
  );

  it.each([
    {
      rule: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_UPDATE,
      profile: {
        description: 'Admin Master',
        uniqueName: ProfileUniqueNameEnum.ADMIN_MASTER,
      },
    },
    {
      rule: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_UPDATE,
      profile: {
        description: 'Employee',
        uniqueName: ProfileUniqueNameEnum.EMPLOYEE,
      },
    },
  ])(
    'should return exception if user email already exists',
    async ({ rule, profile }) => {
      sut.setAbilities([rule]);

      const user = new User();
      user.profile = new Profile(profile.description, profile.uniqueName);
      user.person = new Person('John Doe', 'JO');

      adminUserRepository.findByUserUuid = vi.fn(async () => user);

      userRepository.findByEmail = vi.fn(async () => new User());

      await expect(sut.execute(uuid4(), updateAdminUserDto)).rejects.toThrow(
        ConflictException,
      );
      await expect(sut.execute(uuid4(), updateAdminUserDto)).rejects.toThrow(
        ErrorMessagesEnum.EMAIL_ALREADY_EXISTS,
      );
    },
  );

  it.each([
    {
      rule: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_UPDATE,
      profile: {
        description: 'Admin Master',
        uniqueName: ProfileUniqueNameEnum.ADMIN_MASTER,
      },
    },
    {
      rule: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_UPDATE,
      profile: {
        description: 'Employee',
        uniqueName: ProfileUniqueNameEnum.EMPLOYEE,
      },
    },
  ])(
    'should return exception if profile not exists',
    async ({ rule, profile }) => {
      sut.setAbilities([rule]);

      const user = new User();
      user.profile = new Profile(profile.description, profile.uniqueName);
      user.person = new Person('John Doe', 'JO');

      adminUserRepository.findByUserUuid = vi.fn(async () => user);

      userRepository.findByEmail = vi.fn(async () => null);

      profileRepository.findById = vi.fn(async () => null);

      await expect(sut.execute(uuid4(), updateAdminUserDto)).rejects.toThrow(
        NotFoundException,
      );
      await expect(sut.execute(uuid4(), updateAdminUserDto)).rejects.toThrow(
        ErrorMessagesEnum.PROFILE_NOT_FOUND,
      );
    },
  );

  it('should return exception if user is not reachable because of disallowed profile', async () => {
    sut.setAbilities([AbilitiesEnum.ADMIN_USERS_EMPLOYEE_UPDATE]);

    const adminMasterProfile = new Profile(
      'Admin Master',
      ProfileUniqueNameEnum.ADMIN_MASTER,
    );

    const user = new User();
    user.profile = adminMasterProfile;
    user.person = new Person();

    adminUserRepository.findByUserUuid = vi.fn(async () => user);

    userRepository.findByEmail = vi.fn(async () => null);

    profileRepository.findById = vi.fn(async () => adminMasterProfile);

    await expect(sut.execute(uuid4(), updateAdminUserDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(uuid4(), updateAdminUserDto)).rejects.toThrow(
      ErrorMessagesEnum.USER_NOT_ALLOWED,
    );
  });

  it.each([
    {
      rule: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_UPDATE,
    },
    {
      rule: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_UPDATE,
    },
  ])('should return exception if profile is not allowed', async ({ rule }) => {
    sut.setAbilities([rule]);

    const user = new User();
    user.profile = new Profile('Employee', ProfileUniqueNameEnum.EMPLOYEE);
    user.person = new Person();

    adminUserRepository.findByUserUuid = vi.fn(async () => user);

    userRepository.findByEmail = vi.fn(async () => null);

    profileRepository.findById = vi.fn(
      async () => new Profile('Customer', ProfileUniqueNameEnum.CUSTOMER),
    );

    await expect(sut.execute(uuid4(), updateAdminUserDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(uuid4(), updateAdminUserDto)).rejects.toThrow(
      ErrorMessagesEnum.PROFILE_NOT_ALLOWED,
    );
  });
});
