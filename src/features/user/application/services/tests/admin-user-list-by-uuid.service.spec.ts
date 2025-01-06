import { vi } from 'vitest';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { Person } from '@/features/user/domain/entities/person';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { PolicyAdapter } from '@/acl/application/adapters/policy.adapter';
import { Policy } from '@/acl/domain/value-objects/policy';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { AclForbiddenException } from '@/common/domain/exceptions/acl.forbbiden.exception';
import { AdminUserListByUuidService } from '@/features/user/application/services/admin-user-list-by-uuid.service';
import { IAdminUserListByUuidUseCase } from '@/features/user/domain/use-cases/admin-user-list-by-uuid.use-case.interface';
import { UUID } from '@/utils/uuid';

describe('AdminUserListByUuidService Unit Tests', () => {
  let sut: AdminUserListByUuidService;
  let adminUserListUseCase: IAdminUserListByUuidUseCase;

  beforeEach(() => {
    adminUserListUseCase = {
      listUserForAdminMaster: vi.fn(() => UserDataBuilder.getPerson()),
      listUserForEmployee: vi.fn(() => UserDataBuilder.getPerson()),
    } as unknown as IAdminUserListByUuidUseCase;

    sut = new AdminUserListByUuidService(adminUserListUseCase);
  });

  it('Should return a list of users from admin master', async () => {
    sut.policy = new PolicyAdapter(
      Policy.create([AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_VIEW]),
    );

    const result: Person = await sut.handle(UUID.generate());

    expect(result).toBeInstanceOf(Person);
  });

  it('Should return a list of users from employee', async () => {
    sut.policy = new PolicyAdapter(
      Policy.create([AbilitiesEnum.ADMIN_USERS_EMPLOYEE_VIEW]),
    );

    const result: Person = await sut.handle(UUID.generate());

    expect(result).toBeInstanceOf(Person);
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy = new PolicyAdapter(Policy.create());
    await expect(sut.handle(UUID.generate())).rejects.toThrow(
      AclForbiddenException,
    );
    await expect(sut.handle(UUID.generate())).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
