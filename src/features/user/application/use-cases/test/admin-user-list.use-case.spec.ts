import { vi } from 'vitest';
import { IAdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository.interface';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { Policy } from '@/acl/domain/core/policy';
import { AdminUserListUseCase } from '@/features/user/application/use-cases/admin-user-list.use-case';
import { AdminUserSearchParamsDto } from '@/features/user/application/dto/admin-user-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';

describe('Admin User List UseCase', () => {
  let sut: AdminUserListUseCase;
  let adminUserSearchParamsDto: AdminUserSearchParamsDto;

  const lengthAwarePaginator: ILengthAwarePaginator = {
    currentPage: 1,
    data: [],
    from: 1,
    lastPage: 1,
    perPage: 1,
    to: 1,
    total: 1,
  };

  const adminUserRepository = {
    paginateResults: vi.fn(async () => lengthAwarePaginator),
  } as unknown as IAdminUserRepository;

  beforeEach(() => {
    sut = new AdminUserListUseCase(adminUserRepository);

    (sut as any).policy = new Policy();

    adminUserSearchParamsDto = new AdminUserSearchParamsDto();
  });

  it.each([
    {
      rule: AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_VIEW,
    },
    {
      rule: AbilitiesEnum.ADMIN_USERS_EMPLOYEE_VIEW,
    },
  ])('should to list admin users by ability', async ({ rule }) => {
    sut.setAbilities([rule]);

    const result = await sut.execute(adminUserSearchParamsDto);

    expect(adminUserRepository.paginateResults).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Object);
    expect(result.currentPage).toBe(lengthAwarePaginator.currentPage);
    expect(result.data).toBe(lengthAwarePaginator.data);
    expect(result.from).toBe(lengthAwarePaginator.from);
    expect(result.lastPage).toBe(lengthAwarePaginator.lastPage);
    expect(result.perPage).toBe(lengthAwarePaginator.perPage);
    expect(result.to).toBe(lengthAwarePaginator.to);
    expect(result.total).toBe(lengthAwarePaginator.total);
  });
});
