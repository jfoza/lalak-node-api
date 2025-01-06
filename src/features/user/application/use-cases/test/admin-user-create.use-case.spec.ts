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
import { AdminUserCreateUseCase } from '@/features/user/application/use-cases/admin-user-create.use-case';
import { PersonUserRepository } from '@/features/user/domain/repositories/person-user-repository';
import { ProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';
import { IAdminUserCreateDto } from '@/features/user/domain/dto/admin-user-create.dto.interface';
import { AdminUserCreateDto } from '@/features/user/application/dto/admin-user-create.dto';

describe('AdminUserCreateUseCase Unit Tests', async () => {
  let sut: AdminUserCreateUseCase;
  let personAdminUserRepository: PersonAdminUserRepository;
  let personUserRepository: PersonUserRepository;
  let profileRepository: ProfileRepository;
  let createAdminUserDto: IAdminUserCreateDto;

  beforeEach(() => {
    personAdminUserRepository = {
      findByUuid: vi.fn(() => null),
      create: vi.fn(() => null),
    } as unknown as PersonAdminUserRepository;

    personUserRepository = {
      findByEmail: vi.fn(() => null),
    } as unknown as PersonUserRepository;

    profileRepository = {
      findByUuid: vi.fn(() => null),
    } as unknown as ProfileRepository;

    sut = new AdminUserCreateUseCase(
      personAdminUserRepository,
      personUserRepository,
      profileRepository,
    );

    createAdminUserDto = new AdminUserCreateDto();
    createAdminUserDto.name = 'Test';
    createAdminUserDto.email = 'test@gmail.com';
    createAdminUserDto.password = 'password';
    createAdminUserDto.profileUuid = UUID.generate();
  });

  it.each([
    {
      profile: UserDataBuilder.getAdminMasterProfile(),
      callback: async () => sut.createUserForAdminMaster(createAdminUserDto),
    },
    {
      profile: UserDataBuilder.getEmployeeProfile(),
      callback: async () => sut.createUserForEmployee(createAdminUserDto),
    },
  ])(
    'Should create a unique admin user for all admin profiles',
    async ({ profile, callback }) => {
      vi.spyOn(personUserRepository, 'findByEmail').mockResolvedValue(null);
      vi.spyOn(personAdminUserRepository, 'create').mockResolvedValue(
        await UserDataBuilder.getPerson(),
      );
      vi.spyOn(profileRepository, 'findByUuid').mockResolvedValue(profile);

      const result = await callback();

      expect(result).toBeInstanceOf(Person);
    },
  );

  it.each([
    {
      callback: async () => sut.createUserForAdminMaster(createAdminUserDto),
    },
    {
      callback: async () => sut.createUserForEmployee(createAdminUserDto),
    },
  ])(
    'Should return exception if email already exists',
    async ({ callback }) => {
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
      callback: async () => sut.createUserForAdminMaster(createAdminUserDto),
    },
    {
      callback: async () => sut.createUserForEmployee(createAdminUserDto),
    },
  ])('Should return exception if profile not exists', async ({ callback }) => {
    vi.spyOn(personUserRepository, 'findByEmail').mockResolvedValue(null);

    await expect(callback()).rejects.toThrow(NotFoundException);
    await expect(callback()).rejects.toThrow(
      ErrorMessagesEnum.PROFILE_NOT_FOUND,
    );
  });

  it.each([
    {
      profile: UserDataBuilder.getCustomerProfile(),
      callback: async () => sut.createUserForAdminMaster(createAdminUserDto),
    },
    {
      profile: UserDataBuilder.getAdminMasterProfile(),
      callback: async () => sut.createUserForEmployee(createAdminUserDto),
    },
  ])(
    'Should return exception if profile is not allowed',
    async ({ profile, callback }) => {
      vi.spyOn(personUserRepository, 'findByEmail').mockResolvedValue(null);
      vi.spyOn(profileRepository, 'findByUuid').mockResolvedValue(profile);

      await expect(callback()).rejects.toThrow(ForbiddenException);
      await expect(callback()).rejects.toThrow(
        ErrorMessagesEnum.PROFILE_NOT_ALLOWED,
      );
    },
  );
});
