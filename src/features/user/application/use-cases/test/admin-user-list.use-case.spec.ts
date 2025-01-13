import { vi } from 'vitest';
import { AdminUserListUseCase } from '@/features/user/application/use-cases/admin-user-list.use-case';
import { AdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository';
import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';
import { AdminUserSearchParamsDto } from '@/features/user/application/dto/admin-user-search-params.dto';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { Person } from '@/features/user/domain/entities/person';

describe('AdminUserListUseCase Unit Tests', () => {
  let sut: AdminUserListUseCase;
  let personAdminUserRepository: AdminUserRepository;
  let adminUserSearchParamsDto: IAdminUserSearchParamsDto;

  beforeEach(() => {
    personAdminUserRepository = {
      findAll: vi.fn(async () => [await UserDataBuilder.getPerson()]),
    } as unknown as AdminUserRepository;

    adminUserSearchParamsDto = new AdminUserSearchParamsDto();

    sut = new AdminUserListUseCase(personAdminUserRepository);
  });

  it('Should return a list of admin users for admin master', async () => {
    const result = await sut.listUserForAdminMaster(adminUserSearchParamsDto);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((person) => {
      expect(person).toBeInstanceOf(Person);
    });
    expect(result.every((person) => person instanceof Person)).toBe(true);
  });

  it('Should return a list of admin users for employee', async () => {
    const result = await sut.listUserForEmployee(adminUserSearchParamsDto);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((person) => {
      expect(person).toBeInstanceOf(Person);
    });
    expect(result.every((person) => person instanceof Person)).toBe(true);
  });
});
