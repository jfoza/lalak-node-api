import { vi } from 'vitest';
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
import { AdminUserUpdateUseCase } from '@/features/user/application/use-cases/admin-user-update.use-case';
import { UpdateAdminUserDto } from '@/features/user/application/dto/update-admin-user.dto';
import { UUID } from '@/common/infra/utils/uuid';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';

describe('Admin User Update UseCase', () => {
  let sut: AdminUserUpdateUseCase;
  let updateAdminUserDto: UpdateAdminUserDto;

  const person = UserDataBuilder.getPerson();
  const user = UserDataBuilder.getUserAdminType();
  const adminUser = UserDataBuilder.getAdminUser();

  const personRepository = {
    update: vi.fn(async () => person),
  } as unknown as IPersonRepository;

  const userRepository = {
    update: vi.fn(async () => user),
    updatePassword: vi.fn(),
  } as unknown as IUserRepository;

  const adminUserRepository = {
    update: vi.fn(async () => adminUser),
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
      profileUuid: UUID.generate(),
    } as UpdateAdminUserDto;
  });

  it.each([
    {
      ability: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_UPDATE,
      profile: {
        description: 'Admin Master',
        uniqueName: ProfileUniqueNameEnum.ADMIN_MASTER,
      },
    },
    {
      ability: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_UPDATE,
      profile: {
        description: 'Employee',
        uniqueName: ProfileUniqueNameEnum.EMPLOYEE,
      },
    },
  ])(
    'should to update admin user by abilities',
    async ({ ability, profile }) => {
      sut.policy.abilities = [ability];

      const userProfile = new Profile({
        description: profile.description,
        uniqueName: profile.uniqueName,
      });

      const user = await UserDataBuilder.getUserAdminType();
      user.profile = userProfile;
      user.person = UserDataBuilder.getPerson();

      adminUserRepository.findByUserUuid = vi.fn(async () => user);

      userRepository.findByEmail = vi.fn(async () => null);

      profileRepository.findById = vi.fn(async () => userProfile);

      const result = await sut.execute(UUID.generate(), updateAdminUserDto);

      expect(personRepository.update).toHaveBeenCalled();
      expect(userRepository.update).toHaveBeenCalled();
      expect(result).toBeInstanceOf(User);
    },
  );

  it.each([
    {
      ability: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_UPDATE,
      profile: {
        description: 'Admin Master',
        uniqueName: ProfileUniqueNameEnum.ADMIN_MASTER,
      },
    },
    {
      ability: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_UPDATE,
      profile: {
        description: 'Employee',
        uniqueName: ProfileUniqueNameEnum.EMPLOYEE,
      },
    },
  ])(
    'should return exception if admin user not exists',
    async ({ ability, profile }) => {
      sut.policy.abilities = [ability];

      adminUserRepository.findByUserUuid = vi.fn(async () => null);

      profileRepository.findById = vi.fn(
        async () =>
          new Profile({
            description: profile.description,
            uniqueName: profile.uniqueName,
          }),
      );

      await expect(
        sut.execute(UUID.generate(), updateAdminUserDto),
      ).rejects.toThrow(NotFoundException);
      await expect(
        sut.execute(UUID.generate(), updateAdminUserDto),
      ).rejects.toThrow(ErrorMessagesEnum.USER_NOT_FOUND);
    },
  );

  it.each([
    {
      ability: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_UPDATE,
      profile: {
        description: 'Admin Master',
        uniqueName: ProfileUniqueNameEnum.ADMIN_MASTER,
      },
    },
    {
      ability: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_UPDATE,
      profile: {
        description: 'Employee',
        uniqueName: ProfileUniqueNameEnum.EMPLOYEE,
      },
    },
  ])(
    'should return exception if user email already exists',
    async ({ ability, profile }) => {
      sut.policy.abilities = [ability];

      const userProfile = new Profile({
        description: profile.description,
        uniqueName: profile.uniqueName,
      });

      const user = await UserDataBuilder.getUserAdminType();
      user.profile = userProfile;
      user.person = UserDataBuilder.getPerson();

      adminUserRepository.findByUserUuid = vi.fn(async () => user);

      userRepository.findByEmail = vi.fn(
        async () => await UserDataBuilder.getUserAdminType(),
      );

      await expect(
        sut.execute(UUID.generate(), updateAdminUserDto),
      ).rejects.toThrow(ConflictException);
      await expect(
        sut.execute(UUID.generate(), updateAdminUserDto),
      ).rejects.toThrow(ErrorMessagesEnum.EMAIL_ALREADY_EXISTS);
    },
  );

  it.each([
    {
      ability: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_UPDATE,
      profile: {
        description: 'Admin Master',
        uniqueName: ProfileUniqueNameEnum.ADMIN_MASTER,
      },
    },
    {
      ability: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_UPDATE,
      profile: {
        description: 'Employee',
        uniqueName: ProfileUniqueNameEnum.EMPLOYEE,
      },
    },
  ])(
    'should return exception if profile not exists',
    async ({ ability, profile }) => {
      sut.policy.abilities = [ability];

      const userProfile = new Profile({
        description: profile.description,
        uniqueName: profile.uniqueName,
      });

      const user = await UserDataBuilder.getUserAdminType();
      user.profile = userProfile;
      user.person = UserDataBuilder.getPerson();

      adminUserRepository.findByUserUuid = vi.fn(async () => user);

      userRepository.findByEmail = vi.fn(async () => null);

      profileRepository.findById = vi.fn(async () => null);

      await expect(
        sut.execute(UUID.generate(), updateAdminUserDto),
      ).rejects.toThrow(NotFoundException);
      await expect(
        sut.execute(UUID.generate(), updateAdminUserDto),
      ).rejects.toThrow(ErrorMessagesEnum.PROFILE_NOT_FOUND);
    },
  );

  it('should return exception if user is not reachable because of disallowed profile', async () => {
    sut.policy.abilities = [AbilitiesEnum.ADMIN_USERS_EMPLOYEE_UPDATE];

    const adminMasterProfile = new Profile({
      description: 'Admin Master',
      uniqueName: ProfileUniqueNameEnum.ADMIN_MASTER,
    });

    const user = await UserDataBuilder.getUserAdminType();
    user.profile = adminMasterProfile;
    user.person = UserDataBuilder.getPerson();

    adminUserRepository.findByUserUuid = vi.fn(async () => user);

    userRepository.findByEmail = vi.fn(async () => null);

    profileRepository.findById = vi.fn(async () => adminMasterProfile);

    await expect(
      sut.execute(UUID.generate(), updateAdminUserDto),
    ).rejects.toThrow(ForbiddenException);
    await expect(
      sut.execute(UUID.generate(), updateAdminUserDto),
    ).rejects.toThrow(ErrorMessagesEnum.USER_NOT_ALLOWED);
  });

  it.each([
    {
      ability: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_UPDATE,
    },
    {
      ability: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_UPDATE,
    },
  ])(
    'should return exception if profile is not allowed',
    async ({ ability }) => {
      sut.policy.abilities = [ability];

      const user = await UserDataBuilder.getUserAdminType();
      user.profile = new Profile({
        description: 'Employee',
        uniqueName: ProfileUniqueNameEnum.EMPLOYEE,
      });
      user.person = UserDataBuilder.getPerson();

      adminUserRepository.findByUserUuid = vi.fn(async () => user);

      userRepository.findByEmail = vi.fn(async () => null);

      profileRepository.findById = vi.fn(
        async () =>
          new Profile({
            description: 'Customer',
            uniqueName: ProfileUniqueNameEnum.CUSTOMER,
          }),
      );

      await expect(
        sut.execute(UUID.generate(), updateAdminUserDto),
      ).rejects.toThrow(ForbiddenException);
      await expect(
        sut.execute(UUID.generate(), updateAdminUserDto),
      ).rejects.toThrow(ErrorMessagesEnum.PROFILE_NOT_ALLOWED);
    },
  );

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(
      sut.execute(UUID.generate(), updateAdminUserDto),
    ).rejects.toThrow(ForbiddenException);
    await expect(
      sut.execute(UUID.generate(), updateAdminUserDto),
    ).rejects.toThrow(ErrorMessagesEnum.NOT_AUTHORIZED);
  });
});
