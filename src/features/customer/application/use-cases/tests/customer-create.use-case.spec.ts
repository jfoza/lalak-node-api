import { vi } from 'vitest';
import { IPersonRepository } from '@/features/user/domain/repositories/person-repository.interface';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { IProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { User } from '@/features/user/domain/core/user';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { Policy } from '@/acl/domain/core/policy';
import { UUID } from '@/common/infra/utils/uuid';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { ICustomerRepository } from '@/features/customer/domain/interfaces/repositories/customer-repository.interface';
import { ICityRepository } from '@/features/city/domain/interfaces/city.repository.interface';
import { CustomerCreateUseCase } from '@/features/customer/application/use-cases/customer-create.use-case';
import { CreateCustomerDto } from '@/features/customer/application/dto/create-customer.dto';
import { BrazilianStates } from '@/common/infra/enums/brazilian-states.enum';
import { City, CityProps } from '@/features/city/domain/core/city';

describe('Admin User Create UseCase', () => {
  let sut: CustomerCreateUseCase;
  let createCustomerDto: CreateCustomerDto;

  const person = UserDataBuilder.getPerson();
  const user = UserDataBuilder.getUserCustomer();
  const customerUser = UserDataBuilder.getCustomer();

  const profileRepository = {
    findByUniqueName: vi.fn(async () => UserDataBuilder.getCustomerProfile()),
  } as unknown as IProfileRepository;

  const cityRepository = {
    cityExists: vi.fn(async () => null),
  } as unknown as ICityRepository;

  const personRepository = {
    create: vi.fn(async () => person),
  } as unknown as IPersonRepository;

  const userRepository = {
    create: vi.fn(async () => user),
    findByEmail: vi.fn(async () => null),
  } as unknown as IUserRepository;

  const customerRepository = {
    create: vi.fn(async () => customerUser),
  } as unknown as ICustomerRepository;

  beforeEach(() => {
    sut = new CustomerCreateUseCase(
      profileRepository,
      cityRepository,
      personRepository,
      userRepository,
      customerRepository,
    );

    (sut as any).policy = new Policy();

    sut.policy.abilities = [AbilitiesEnum.CUSTOMERS_INSERT];

    createCustomerDto = {
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
    } as CreateCustomerDto;
  });

  it('should create new customer user by abilities', async () => {
    cityRepository.findById = vi.fn(
      async () =>
        new City({
          description: 'test',
          uf: BrazilianStates.AC,
        } as CityProps),
    );

    const result = await sut.execute(createCustomerDto);

    expect(personRepository.create).toHaveBeenCalled();
    expect(userRepository.create).toHaveBeenCalled();
    expect(customerRepository.create).toHaveBeenCalled();
    expect(result).toBeInstanceOf(User);
  });

  it('should return exception if user email already exists', async () => {
    const user = await UserDataBuilder.getUserAdminType();

    userRepository.findByEmail = vi.fn(async () => user);

    await expect(sut.execute(createCustomerDto)).rejects.toThrow(
      ConflictException,
    );
    await expect(sut.execute(createCustomerDto)).rejects.toThrow(
      ErrorMessagesEnum.EMAIL_ALREADY_EXISTS,
    );
  });

  it('should return exception if user email already exists', async () => {
    userRepository.findByEmail = vi.fn(async () => null);
    cityRepository.findById = vi.fn(async () => null);

    await expect(sut.execute(createCustomerDto)).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(createCustomerDto)).rejects.toThrow(
      ErrorMessagesEnum.CITY_NOT_FOUND,
    );
  });

  it('Should return exception if user has not permission', async () => {
    sut.policy.abilities = ['ABC'];

    await expect(sut.execute(createCustomerDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(sut.execute(createCustomerDto)).rejects.toThrow(
      ErrorMessagesEnum.NOT_AUTHORIZED,
    );
  });
});
