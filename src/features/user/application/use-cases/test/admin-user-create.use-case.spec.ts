import { vi } from 'vitest';
import { AdminUserCreateUseCase } from '@/features/user/application/use-cases/admin-user-create.use-case';
import { CreateAdminUserDto } from '@/features/user/application/dto/create-admin-user.dto';
import { IPersonRepository } from '@/features/user/domain/repositories/person-repository.interface';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { IAdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository.interface';
import { IProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';
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
import { ProfileUniqueNameEnum } from '@/common/infra/enums/profile-unique-name.enum';
import { UUID } from '@/common/infra/utils/uuid';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';

describe('Admin User Create UseCase', () => {
  let sut: AdminUserCreateUseCase;
  let createAdminUserDto: CreateAdminUserDto;

  const person = UserDataBuilder.getPerson();
  const user = UserDataBuilder.getUserAdminType();
  const adminUser = UserDataBuilder.getAdminUser();

  const personRepository = {
    create: vi.fn(async () => person),
  } as unknown as IPersonRepository;

  const userRepository = {
    create: vi.fn(async () => user),
    findByEmail: vi.fn(async () => null),
  } as unknown as IUserRepository;

  const adminUserRepository = {
    create: vi.fn(async () => adminUser),
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
      profileUuid: UUID.generate(),
    } as CreateAdminUserDto;
  });

  it.each([
    {
      ability: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_INSERT,
      profile: {
        description: 'Admin Master',
        uniqueName: ProfileUniqueNameEnum.ADMIN_MASTER,
      },
    },
    {
      ability: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_INSERT,
      profile: {
        description: 'Employee',
        uniqueName: ProfileUniqueNameEnum.EMPLOYEE,
      },
    },
  ])(
    'should create new admin user by abilities',
    async ({ ability, profile }) => {
      sut.policy.abilities = [ability];

      profileRepository.findById = vi.fn(
        async () =>
          new Profile({
            description: profile.description,
            uniqueName: profile.uniqueName,
          }),
      );

      const result = await sut.execute(createAdminUserDto);

      expect(personRepository.create).toHaveBeenCalled();
      expect(userRepository.create).toHaveBeenCalled();
      expect(adminUserRepository.create).toHaveBeenCalled();
      expect(result).toBeInstanceOf(User);
    },
  );

  it.each([
    { ability: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_INSERT },
    { ability: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_INSERT },
  ])(
    'should return exception if user email already exists',
    async ({ ability }) => {
      sut.policy.abilities = [ability];

      const user = await UserDataBuilder.getUserAdminType();

      userRepository.findByEmail = vi.fn(async () => user);

      await expect(sut.execute(createAdminUserDto)).rejects.toThrow(
        ConflictException,
      );
      await expect(sut.execute(createAdminUserDto)).rejects.toThrow(
        ErrorMessagesEnum.EMAIL_ALREADY_EXISTS,
      );
    },
  );

  it.each([
    { ability: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_INSERT },
    { ability: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_INSERT },
  ])('should return exception if profile not exists', async ({ ability }) => {
    sut.policy.abilities = [ability];

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
      ability: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_INSERT,
      profile: {
        description: 'Customer',
        uniqueName: ProfileUniqueNameEnum.CUSTOMER,
      },
    },
    {
      ability: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_INSERT,
      profile: {
        description: 'Customer',
        uniqueName: ProfileUniqueNameEnum.CUSTOMER,
      },
    },
  ])(
    'should return exception if profile is not allowed',
    async ({ ability, profile }) => {
      sut.policy.abilities = [ability];

      userRepository.findByEmail = vi.fn(async () => null);

      profileRepository.findById = vi.fn(
        async () =>
          new Profile({
            description: profile.description,
            uniqueName: profile.uniqueName,
          }),
      );

      await expect(sut.execute(createAdminUserDto)).rejects.toThrow(
        ForbiddenException,
      );
      await expect(sut.execute(createAdminUserDto)).rejects.toThrow(
        ErrorMessagesEnum.PROFILE_NOT_ALLOWED,
      );
    },
  );

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(sut.execute(createAdminUserDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(createAdminUserDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
