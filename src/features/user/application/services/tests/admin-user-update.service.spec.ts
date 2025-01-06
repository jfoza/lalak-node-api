import { vi } from 'vitest';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { Person } from '@/features/user/domain/entities/person';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { PolicyAdapter } from '@/acl/application/adapters/policy.adapter';
import { Policy } from '@/acl/domain/value-objects/policy';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { AclForbiddenException } from '@/common/domain/exceptions/acl.forbbiden.exception';
import { UUID } from '@/utils/uuid';
import { AdminUserUpdateService } from '@/features/user/application/services/admin-user-update.service';
import { IAdminUserUpdateUseCase } from '@/features/user/domain/use-cases/admin-user-update.use-case.interface';
import { IAdminUserUpdateDto } from '@/features/user/domain/dto/admin-user-update.dto.interface';
import { AdminUserUpdateDto } from '@/features/user/application/dto/admin-user-update.dto';

describe('AdminUserUpdateService Unit Tests', () => {
  let sut: AdminUserUpdateService;
  let adminUserUpdateDto: IAdminUserUpdateDto;
  let useCase: IAdminUserUpdateUseCase;

  beforeEach(() => {
    useCase = {
      updateUserForAdminMaster: vi.fn(
        async () => await UserDataBuilder.getPerson(),
      ),
      updateUserForEmployee: vi.fn(
        async () => await UserDataBuilder.getPerson(),
      ),
    } as unknown as IAdminUserUpdateUseCase;

    adminUserUpdateDto = new AdminUserUpdateDto();

    sut = new AdminUserUpdateService(useCase);
  });

  it('Should update admin user from admin master', async () => {
    sut.policy = new PolicyAdapter(
      Policy.create([AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_UPDATE]),
    );

    const result: Person = await sut.handle(
      UUID.generate(),
      adminUserUpdateDto,
    );

    expect(result).toBeInstanceOf(Person);
  });

  it('Should return a list of users from employee', async () => {
    sut.policy = new PolicyAdapter(
      Policy.create([AbilitiesEnum.ADMIN_USERS_EMPLOYEE_UPDATE]),
    );

    const result: Person = await sut.handle(
      UUID.generate(),
      adminUserUpdateDto,
    );

    expect(result).toBeInstanceOf(Person);
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy = new PolicyAdapter(Policy.create());
    await expect(
      sut.handle(UUID.generate(), adminUserUpdateDto),
    ).rejects.toThrow(AclForbiddenException);
    await expect(
      sut.handle(UUID.generate(), adminUserUpdateDto),
    ).rejects.toThrow(ErrorMessagesEnum.NOT_AUTHORIZED);
  });
});
