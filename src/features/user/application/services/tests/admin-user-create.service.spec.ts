import { vi } from 'vitest';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { Person } from '@/features/user/domain/entities/person';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { PolicyAdapter } from '@/acl/application/adapters/policy.adapter';
import { Policy } from '@/acl/domain/value-objects/policy';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { AclForbiddenException } from '@/common/domain/exceptions/acl.forbbiden.exception';
import { AdminUserCreateService } from '@/features/user/application/services/admin-user-create.service';
import { IAdminUserCreateUseCase } from '@/features/user/domain/use-cases/admin-user-create.use-case.interface';
import { IAdminUserCreateDto } from '@/features/user/domain/dto/admin-user-create.dto.interface';
import { AdminUserCreateDto } from '@/features/user/application/dto/admin-user-create.dto';

describe('AdminUserCreateService Unit Tests', () => {
  let sut: AdminUserCreateService;
  let adminUserCreateDto: IAdminUserCreateDto;
  let useCase: IAdminUserCreateUseCase;

  beforeEach(() => {
    useCase = {
      createUserForAdminMaster: vi.fn(
        async () => await UserDataBuilder.getPerson(),
      ),
      createUserForEmployee: vi.fn(
        async () => await UserDataBuilder.getPerson(),
      ),
    } as unknown as IAdminUserCreateUseCase;

    adminUserCreateDto = new AdminUserCreateDto();

    sut = new AdminUserCreateService(useCase);
  });

  it('Should create admin user from admin master', async () => {
    sut.policy = new PolicyAdapter(
      Policy.create([AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_INSERT]),
    );

    const result: Person = await sut.handle(adminUserCreateDto);

    expect(result).toBeInstanceOf(Person);
  });

  it('Should return a list of users from employee', async () => {
    sut.policy = new PolicyAdapter(
      Policy.create([AbilitiesEnum.ADMIN_USERS_EMPLOYEE_INSERT]),
    );

    const result: Person = await sut.handle(adminUserCreateDto);

    expect(result).toBeInstanceOf(Person);
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy = new PolicyAdapter(Policy.create());
    await expect(sut.handle(adminUserCreateDto)).rejects.toThrow(
      AclForbiddenException,
    );
    await expect(sut.handle(adminUserCreateDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
