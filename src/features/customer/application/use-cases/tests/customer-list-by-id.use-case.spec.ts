import { vi } from 'vitest';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { Policy } from '@/acl/domain/core/policy';
import { User } from '@/features/user/domain/core/user';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { UUID } from '@/common/infra/utils/uuid';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { CustomerListByIdUseCase } from '@/features/customer/application/use-cases/customer-list-by-id.use-case';
import { ICustomerRepository } from '@/features/customer/domain/interfaces/repositories/customer-repository.interface';

describe('Admin User List By Id UseCase', () => {
  let sut: CustomerListByIdUseCase;
  const uuid = UUID.generate();

  const customerRepository: ICustomerRepository = {
    findByUserUuid: vi.fn(async () => null),
  } as unknown as ICustomerRepository;

  beforeEach(() => {
    sut = new CustomerListByIdUseCase(customerRepository);

    (sut as any).policy = new Policy();

    sut.policy.abilities = [AbilitiesEnum.CUSTOMERS_VIEW];
  });

  it('should to list user id by ability', async () => {
    const user = await UserDataBuilder.getUserCustomer();

    customerRepository.findByUserUuid = vi.fn(async () => user);

    const result = await sut.execute(uuid);

    expect(customerRepository.findByUserUuid).toHaveBeenCalled();
    expect(result).toBeInstanceOf(User);
  });

  it('should return exception if user not exists', async () => {
    customerRepository.findByUserUuid = vi.fn(async () => null);

    await expect(sut.execute(uuid)).rejects.toThrow(NotFoundException);
    await expect(sut.execute(uuid)).rejects.toThrow(
      ErrorMessagesEnum.USER_NOT_FOUND,
    );
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(sut.execute(uuid)).rejects.toThrow(ForbiddenException);
    await expect(sut.execute(uuid)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
