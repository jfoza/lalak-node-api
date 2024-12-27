import { vi } from 'vitest';
import { IPersonRepository } from '@/features/user/domain/repositories/person-repository.interface';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { User } from '@/features/user/domain/entities/user';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { Policy } from '@/acl/domain/entities/policy';
import { UUID } from '@/utils/uuid';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { ICityRepository } from '@/features/city/domain/interfaces/city.repository.interface';
import { ICustomerRepository } from '@/features/customer/domain/repositories/customer-repository.interface';
import { CustomerUpdateUseCase } from '@/features/customer/application/use-cases/customer-update.use-case';
import { UpdateCustomerDto } from '@/features/customer/application/dto/update-customer.dto';
import { BrazilianStates } from '@/utils/enums/brazilian-states.enum';
import { City, CityProps } from '@/features/city/domain/core/city';

describe('Admin User Update UseCase', () => {
  let sut: CustomerUpdateUseCase;
  let updateCustomerDto: UpdateCustomerDto;

  const person = UserDataBuilder.getPerson();
  const user = UserDataBuilder.getUserCustomer();

  const cityRepository = {
    cityExists: vi.fn(async () => null),
  } as unknown as ICityRepository;

  const personRepository = {
    update: vi.fn(async () => person),
  } as unknown as IPersonRepository;

  const userRepository = {
    update: vi.fn(async () => user),
    findByEmail: vi.fn(async () => null),
  } as unknown as IUserRepository;

  const customerRepository = {
    findByUserUuid: vi.fn(async () => user),
  } as unknown as ICustomerRepository;

  beforeEach(() => {
    sut = new CustomerUpdateUseCase(
      cityRepository,
      personRepository,
      userRepository,
      customerRepository,
    );

    sut.policy = new Policy([AbilitiesEnum.CUSTOMERS_UPDATE]);

    updateCustomerDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      birthDate: '1995-04-19',
      phone: '51999122009',
      zipCode: '93052170',
      address: 'test',
      numberAddress: '00',
      complement: 'test',
      district: 'test',
      uf: BrazilianStates.AC,
      cityUuid: UUID.generate(),
    } as UpdateCustomerDto;
  });

  it('should to update customer user by abilities', async () => {
    const user = await UserDataBuilder.getUserCustomer();
    user.person = UserDataBuilder.getPerson();

    customerRepository.findByUserUuid = vi.fn(async () => user);

    userRepository.findByEmail = vi.fn(async () => null);

    cityRepository.findById = vi.fn(
      async () =>
        new City({
          description: 'test',
          uf: BrazilianStates.AC,
        } as CityProps),
    );

    const result = await sut.execute(UUID.generate(), updateCustomerDto);

    expect(personRepository.update).toHaveBeenCalled();
    expect(userRepository.update).toHaveBeenCalled();
    expect(result).toBeInstanceOf(User);
  });

  it('should return exception if admin user not exists', async () => {
    customerRepository.findByUserUuid = vi.fn(async () => null);

    await expect(
      sut.execute(UUID.generate(), updateCustomerDto),
    ).rejects.toThrow(NotFoundException);
    await expect(
      sut.execute(UUID.generate(), updateCustomerDto),
    ).rejects.toThrow(ErrorMessagesEnum.USER_NOT_FOUND);
  });

  it('should return exception if user email already exists', async () => {
    const user = await UserDataBuilder.getUserCustomer();
    user.person = UserDataBuilder.getPerson();

    customerRepository.findByUserUuid = vi.fn(async () => user);

    userRepository.findByEmail = vi.fn(
      async () => await UserDataBuilder.getUserAdminType(),
    );

    await expect(
      sut.execute(UUID.generate(), updateCustomerDto),
    ).rejects.toThrow(ConflictException);
    await expect(
      sut.execute(UUID.generate(), updateCustomerDto),
    ).rejects.toThrow(ErrorMessagesEnum.EMAIL_ALREADY_EXISTS);
  });

  it('should return exception if city not exists', async () => {
    const user = await UserDataBuilder.getUserCustomer();
    user.person = UserDataBuilder.getPerson();

    customerRepository.findByUserUuid = vi.fn(async () => user);

    userRepository.findByEmail = vi.fn(async () => null);

    cityRepository.findById = vi.fn(async () => null);

    await expect(
      sut.execute(UUID.generate(), updateCustomerDto),
    ).rejects.toThrow(NotFoundException);
    await expect(
      sut.execute(UUID.generate(), updateCustomerDto),
    ).rejects.toThrow(ErrorMessagesEnum.CITY_NOT_FOUND);
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy = new Policy(['ABC']);

    await expect(
      sut.execute(UUID.generate(), updateCustomerDto),
    ).rejects.toThrow(ForbiddenException);
    await expect(
      sut.execute(UUID.generate(), updateCustomerDto),
    ).rejects.toThrow(ErrorMessagesEnum.NOT_AUTHORIZED);
  });
});
