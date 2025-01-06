import { vi } from 'vitest';
import { PersonAdminUserRepository } from '@/features/user/domain/repositories/person-admin-user.repository';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { Person } from '@/features/user/domain/entities/person';
import { UUID } from '@/utils/uuid';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PersonUserRepository } from '@/features/user/domain/repositories/person-user-repository';
import { ProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';
import { IAdminUserCreateDto } from '@/features/user/domain/dto/admin-user-create.dto.interface';
import { AdminUserCreateDto } from '@/features/user/application/dto/admin-user-create.dto';
import { AdminUserUpdateUseCase } from '@/features/user/application/use-cases/admin-user-update.use-case';

describe('AdminUserUpdateUseCase Unit Tests', async () => {
  let sut: AdminUserUpdateUseCase;
  let personAdminUserRepository: PersonAdminUserRepository;
  let personUserRepository: PersonUserRepository;
  let profileRepository: ProfileRepository;
  let createAdminUserDto: IAdminUserCreateDto;
  const uuid: string = UUID.generate();

  beforeEach(() => {
    personAdminUserRepository = {
      findByUuid: vi.fn(() => null),
      update: vi.fn(() => null),
    } as unknown as PersonAdminUserRepository;

    personUserRepository = {
      findByEmail: vi.fn(() => null),
    } as unknown as PersonUserRepository;

    profileRepository = {
      findByUuid: vi.fn(() => null),
    } as unknown as ProfileRepository;

    sut = new AdminUserUpdateUseCase(
      personAdminUserRepository,
      personUserRepository,
      profileRepository,
    );

    createAdminUserDto = new AdminUserCreateDto();
    createAdminUserDto.name = 'Test';
    createAdminUserDto.email = 'test@gmail.com';
    createAdminUserDto.profileUuid = UUID.generate();
  });

  it.each([
    {
      profile: UserDataBuilder.getAdminMasterProfile(),
      callback: async () =>
        sut.updateUserForAdminMaster(uuid, createAdminUserDto),
    },
    {
      profile: UserDataBuilder.getEmployeeProfile(),
      callback: async () => sut.updateUserForEmployee(uuid, createAdminUserDto),
    },
  ])(
    'Should update a unique admin user for all admin profiles',
    async ({ profile, callback }) => {
      vi.spyOn(personAdminUserRepository, 'findByUuid').mockResolvedValue(
        await UserDataBuilder.getPersonEmployee(),
      );
      vi.spyOn(personAdminUserRepository, 'update').mockResolvedValue(
        await UserDataBuilder.getPerson(),
      );
      vi.spyOn(personUserRepository, 'findByEmail').mockResolvedValue(null);
      vi.spyOn(profileRepository, 'findByUuid').mockResolvedValue(profile);

      const result = await callback();

      expect(result).toBeInstanceOf(Person);
    },
  );

  it.each([
    {
      callback: async () =>
        sut.updateUserForAdminMaster(uuid, createAdminUserDto),
    },
    {
      callback: async () => sut.updateUserForEmployee(uuid, createAdminUserDto),
    },
  ])(
    'Should return exception if admin user not found',
    async ({ callback }) => {
      vi.spyOn(personAdminUserRepository, 'findByUuid').mockResolvedValue(null);

      await expect(callback()).rejects.toThrow(NotFoundException);
      await expect(callback()).rejects.toThrow(
        ErrorMessagesEnum.USER_NOT_FOUND,
      );
    },
  );

  it.each([
    {
      callback: async () =>
        sut.updateUserForAdminMaster(uuid, createAdminUserDto),
    },
    {
      callback: async () => sut.updateUserForEmployee(uuid, createAdminUserDto),
    },
  ])(
    'Should return exception if email already exists',
    async ({ callback }) => {
      vi.spyOn(personAdminUserRepository, 'findByUuid').mockResolvedValue(
        await UserDataBuilder.getPersonEmployee(),
      );
      vi.spyOn(personUserRepository, 'findByEmail').mockResolvedValue(
        await UserDataBuilder.getPerson(),
      );

      await expect(callback()).rejects.toThrow(ConflictException);
      await expect(callback()).rejects.toThrow(
        ErrorMessagesEnum.EMAIL_ALREADY_EXISTS,
      );
    },
  );

  it.each([
    {
      callback: async () =>
        sut.updateUserForAdminMaster(uuid, createAdminUserDto),
    },
    {
      callback: async () => sut.updateUserForEmployee(uuid, createAdminUserDto),
    },
  ])('Should return exception if profile not exists', async ({ callback }) => {
    vi.spyOn(personAdminUserRepository, 'findByUuid').mockResolvedValue(
      await UserDataBuilder.getPersonEmployee(),
    );
    vi.spyOn(personUserRepository, 'findByEmail').mockResolvedValue(null);
    vi.spyOn(profileRepository, 'findByUuid').mockResolvedValue(null);

    await expect(callback()).rejects.toThrow(NotFoundException);
    await expect(callback()).rejects.toThrow(
      ErrorMessagesEnum.PROFILE_NOT_FOUND,
    );
  });

  it('Should return exception if user cannot be accessed', async () => {
    vi.spyOn(personAdminUserRepository, 'findByUuid').mockResolvedValue(
      await UserDataBuilder.getPersonAdminMaster(),
    );
    vi.spyOn(personUserRepository, 'findByEmail').mockResolvedValue(null);
    vi.spyOn(profileRepository, 'findByUuid').mockResolvedValue(
      UserDataBuilder.getCustomerProfile(),
    );

    await expect(
      sut.updateUserForEmployee(uuid, createAdminUserDto),
    ).rejects.toThrow(ForbiddenException);
    await expect(
      sut.updateUserForEmployee(uuid, createAdminUserDto),
    ).rejects.toThrow(ErrorMessagesEnum.USER_NOT_ALLOWED);
  });

  it.each([
    {
      callback: async () =>
        sut.updateUserForAdminMaster(uuid, createAdminUserDto),
    },
    {
      callback: async () => sut.updateUserForEmployee(uuid, createAdminUserDto),
    },
  ])(
    'Should return exception if profile is not allowed',
    async ({ callback }) => {
      vi.spyOn(personAdminUserRepository, 'findByUuid').mockResolvedValue(
        await UserDataBuilder.getPersonEmployee(),
      );
      vi.spyOn(personUserRepository, 'findByEmail').mockResolvedValue(null);
      vi.spyOn(profileRepository, 'findByUuid').mockResolvedValue(
        UserDataBuilder.getCustomerProfile(),
      );

      await expect(callback()).rejects.toThrow(ForbiddenException);
      await expect(callback()).rejects.toThrow(
        ErrorMessagesEnum.PROFILE_NOT_ALLOWED,
      );
    },
  );
});
