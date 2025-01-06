import { vi } from 'vitest';
import { PersonAdminUserRepository } from '@/features/user/domain/repositories/person-admin-user.repository';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { Person } from '@/features/user/domain/entities/person';
import { AdminUserListByUuidUseCase } from '@/features/user/application/use-cases/admin-user-list-by-uuid.use-case';
import { UUID } from '@/utils/uuid';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('AdminUserListByUuidUseCase Unit Tests', () => {
  let sut: AdminUserListByUuidUseCase;
  let personAdminUserRepository: PersonAdminUserRepository;

  beforeEach(() => {
    personAdminUserRepository = {
      findByUuid: vi.fn(async () => await UserDataBuilder.getPerson()),
    } as unknown as PersonAdminUserRepository;

    sut = new AdminUserListByUuidUseCase(personAdminUserRepository);
  });

  it('Should return a unique admin user for admin master', async () => {
    const person = await UserDataBuilder.getPersonAdminMaster();

    vi.spyOn(personAdminUserRepository, 'findByUuid').mockResolvedValue(person);

    const result = await sut.listUserForAdminMaster(UUID.generate());

    expect(personAdminUserRepository.findByUuid).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Person);
  });

  it('Should return a list of admin users for employee', async () => {
    const person = await UserDataBuilder.getPersonEmployee();

    vi.spyOn(personAdminUserRepository, 'findByUuid').mockResolvedValue(person);

    const result = await sut.listUserForEmployee(UUID.generate());

    expect(personAdminUserRepository.findByUuid).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Person);
  });

  it('Should return exception if admin user not exists', async () => {
    vi.spyOn(personAdminUserRepository, 'findByUuid').mockResolvedValue(null);

    await expect(sut.listUserForAdminMaster(UUID.generate())).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.listUserForAdminMaster(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.USER_NOT_FOUND,
    );

    await expect(sut.listUserForEmployee(UUID.generate())).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.listUserForEmployee(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.USER_NOT_FOUND,
    );
  });

  it('Should return exception if profile is not allowed', async () => {
    const person = await UserDataBuilder.getPersonAdminMaster();

    vi.spyOn(personAdminUserRepository, 'findByUuid').mockResolvedValue(person);

    await expect(sut.listUserForEmployee(UUID.generate())).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.listUserForEmployee(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.USER_NOT_ALLOWED,
    );
  });
});
