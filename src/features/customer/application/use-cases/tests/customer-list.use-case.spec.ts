import { vi } from 'vitest';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { Policy } from '@/acl/domain/core/policy';
import { AdminUserSearchParamsDto } from '@/features/user/application/dto/admin-user-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { CustomerListUseCase } from '@/features/customer/application/use-cases/customer-list.use-case';
import { CustomerSearchParamsDto } from '@/features/customer/application/dto/customer-search-params.dto';
import { ICustomerRepository } from '@/features/customer/domain/interfaces/repositories/customer-repository.interface';
import { ForbiddenException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

describe('Customer List UseCase', () => {
  let sut: CustomerListUseCase;
  let customerSearchParamsDto: CustomerSearchParamsDto;

  const lengthAwarePaginator: ILengthAwarePaginator = {
    currentPage: 1,
    data: [],
    from: 1,
    lastPage: 1,
    perPage: 1,
    to: 1,
    total: 1,
  };

  const customerRepository = {
    paginate: vi.fn(async () => lengthAwarePaginator),
  } as unknown as ICustomerRepository;

  beforeEach(() => {
    sut = new CustomerListUseCase(customerRepository);

    (sut as any).policy = new Policy();

    customerSearchParamsDto = new AdminUserSearchParamsDto();
  });

  it('should to list users by ability', async () => {
    sut.policy.abilities = [AbilitiesEnum.CUSTOMERS_VIEW];

    const result = await sut.execute(customerSearchParamsDto);

    expect(customerRepository.paginate).toHaveBeenCalled();
    expect(result.currentPage).toBe(lengthAwarePaginator.currentPage);
    expect(result.data).toBe(lengthAwarePaginator.data);
    expect(result.from).toBe(lengthAwarePaginator.from);
    expect(result.lastPage).toBe(lengthAwarePaginator.lastPage);
    expect(result.perPage).toBe(lengthAwarePaginator.perPage);
    expect(result.to).toBe(lengthAwarePaginator.to);
    expect(result.total).toBe(lengthAwarePaginator.total);
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(sut.execute(customerSearchParamsDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(customerSearchParamsDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
