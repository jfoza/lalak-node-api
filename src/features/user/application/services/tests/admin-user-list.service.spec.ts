import { vi } from 'vitest';
import { AdminUserListService } from '@/features/user/application/services/admin-user-list.service';
import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';
import { IAdminUserListUseCase } from '@/features/user/domain/use-cases/admin-user-list.use-case.interface';
import { AdminUserSearchParamsDto } from '@/features/user/application/dto/admin-user-search-params.dto';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { Person } from '@/features/user/domain/entities/person';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { PolicyAdapter } from '@/acl/application/adapters/policy.adapter';
import { Policy } from '@/acl/domain/value-objects/policy';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { AclForbiddenException } from '@/common/domain/exceptions/acl.forbbiden.exception';

describe('AdminUserListService Unit Tests', () => {
  let sut: AdminUserListService;
  let adminUserSearchParamsDto: IAdminUserSearchParamsDto;
  let adminUserListUseCase: IAdminUserListUseCase;

  beforeEach(() => {
    adminUserListUseCase = {
      listUserForAdminMaster: vi.fn(async () => [
        await UserDataBuilder.getPerson(),
      ]),
      listUserForEmployee: vi.fn(async () => [
        await UserDataBuilder.getPerson(),
      ]),
    } as unknown as IAdminUserListUseCase;

    adminUserSearchParamsDto = new AdminUserSearchParamsDto();

    sut = new AdminUserListService(adminUserListUseCase);
  });

  it('Should return a list of users from admin master', async () => {
    sut.policy = new PolicyAdapter(
      Policy.create([AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_VIEW]),
    );

    const result: Person[] = await sut.handle(adminUserSearchParamsDto);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((person) => {
      expect(person).toBeInstanceOf(Person);
    });
    expect(result.every((person) => person instanceof Person)).toBe(true);
  });

  it('Should return a list of users from employee', async () => {
    sut.policy = new PolicyAdapter(
      Policy.create([AbilitiesEnum.ADMIN_USERS_EMPLOYEE_VIEW]),
    );

    const result: Person[] = await sut.handle(adminUserSearchParamsDto);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((person) => {
      expect(person).toBeInstanceOf(Person);
    });
    expect(result.every((person) => person instanceof Person)).toBe(true);
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy = new PolicyAdapter(Policy.create());
    await expect(sut.handle(adminUserSearchParamsDto)).rejects.toThrow(
      AclForbiddenException,
    );
    await expect(sut.handle(adminUserSearchParamsDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
