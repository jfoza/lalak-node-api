import { vi } from 'vitest';
import { AdminUserCreateUseCase } from '@/features/user/application/use-cases/admin-user-create.use-case';
import { CreateAdminUserDto } from '@/features/user/application/dto/create-admin-user.dto';
import { IPersonRepository } from '@/features/user/domain/repositories/person-repository.interface';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { IAdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository.interface';
import { IProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';
import { v4 as uuid } from 'uuid';
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

describe('Admin User Create UseCase', () => {
  let sut: AdminUserCreateUseCase;
  let createAdminUserDto: CreateAdminUserDto;

  const personRepository = {
    create: vi.fn(async () => new Person()),
  } as unknown as IPersonRepository;

  const userRepository = {
    create: vi.fn(async () => new User()),
    findByEmail: vi.fn(async () => null),
  } as unknown as IUserRepository;

  const adminUserRepository = {
    create: vi.fn(async () => new AdminUser()),
  } as unknown as IAdminUserRepository;

  const profileRepository = {
    findById: vi.fn(async () => null),
  } as unknown as IProfileRepository;

  beforeEach(() => {
    sut = new AdminUserCreateUseCase(
      personRepository,
      userRepository,
      adminUserRepository,
      profileRepository,
    );

    (sut as any).policy = new Policy();

    createAdminUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      profileUuid: uuid(),
    } as CreateAdminUserDto;
  });

  it.each([
    {
      rule: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_INSERT,
      profile: {
        description: 'Admin Master',
        uniqueName: ProfileUniqueNameEnum.ADMIN_MASTER,
      },
    },
    {
      rule: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_INSERT,
      profile: {
        description: 'Employee',
        uniqueName: ProfileUniqueNameEnum.EMPLOYEE,
      },
    },
  ])('should create new admin user by abilities', async ({ rule, profile }) => {
    sut.setAbilities([rule]);

    profileRepository.findById = vi.fn(
      async () => new Profile(profile.description, profile.uniqueName),
    );

    const result = await sut.execute(createAdminUserDto);

    expect(personRepository.create).toHaveBeenCalled();
    expect(userRepository.create).toHaveBeenCalled();
    expect(adminUserRepository.create).toHaveBeenCalled();
    expect(result).toBeInstanceOf(User);
  });

  it.each([
    { rule: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_INSERT },
    { rule: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_INSERT },
  ])(
    'should return exception if user email already exists',
    async ({ rule }) => {
      sut.setAbilities([rule]);

      userRepository.findByEmail = vi.fn(async () => new User());

      await expect(sut.execute(createAdminUserDto)).rejects.toThrow(
        ConflictException,
      );
      await expect(sut.execute(createAdminUserDto)).rejects.toThrow(
        ErrorMessagesEnum.EMAIL_ALREADY_EXISTS,
      );
    },
  );

  it.each([
    { rule: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_INSERT },
    { rule: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_INSERT },
  ])('should return exception if profile not exists', async ({ rule }) => {
    sut.setAbilities([rule]);

    userRepository.findByEmail = vi.fn(async () => null);
    profileRepository.findById = vi.fn(async () => null);

    await expect(sut.execute(createAdminUserDto)).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(createAdminUserDto)).rejects.toThrow(
      ErrorMessagesEnum.PROFILE_NOT_FOUND,
    );
  });

  it.each([
    {
      rule: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_INSERT,
      profile: {
        description: 'Customer',
        uniqueName: ProfileUniqueNameEnum.CUSTOMER,
      },
    },
    {
      rule: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_INSERT,
      profile: {
        description: 'Customer',
        uniqueName: ProfileUniqueNameEnum.CUSTOMER,
      },
    },
  ])(
    'should return exception if profile is not allowed',
    async ({ rule, profile }) => {
      sut.setAbilities([rule]);

      userRepository.findByEmail = vi.fn(async () => null);

      profileRepository.findById = vi.fn(
        async () => new Profile(profile.description, profile.uniqueName),
      );

      await expect(sut.execute(createAdminUserDto)).rejects.toThrow(
        ForbiddenException,
      );
      await expect(sut.execute(createAdminUserDto)).rejects.toThrow(
        ErrorMessagesEnum.PROFILE_NOT_ALLOWED,
      );
    },
  );
});
