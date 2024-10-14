import { ICustomerCreateUseCase } from '@/features/customer/domain/interfaces/use-cases/customer-create.use-case.interface';
import { CreateCustomerDto } from '@/features/customer/application/dto/create-customer.dto';
import { User, UserProps } from '@/features/user/domain/core/user';
import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from '@/features/customer/domain/interfaces/repositories/customer-repository.interface';
import { IPersonRepository } from '@/features/user/domain/repositories/person-repository.interface';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { IProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';
import { PolicyUseCase } from '@/common/application/use-cases/policy.use-case';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { UserValidations } from '@/features/user/application/validations/user.validations';
import { ProfileUniqueNameEnum } from '@/common/infra/enums/profile-unique-name.enum';
import { Person, PersonProps } from '@/features/user/domain/core/person';
import { Helper } from 'src/common/infra/helpers';
import { Hash } from '@/common/infra/utils/hash';
import {
  Customer,
  CustomerProps,
} from '@/features/customer/domain/core/customer';
import { CityValidations } from '@/features/city/application/validations/city.validations';
import { ICityRepository } from '@/features/city/domain/interfaces/city.repository.interface';

@Injectable()
export class CustomerCreateUseCase
  extends PolicyUseCase
  implements ICustomerCreateUseCase
{
  constructor(
    @Inject('IProfileRepository')
    private readonly profileRepository: IProfileRepository,

    @Inject('ICityRepository')
    private readonly cityRepository: ICityRepository,

    @Inject('IPersonRepository')
    private readonly personRepository: IPersonRepository,

    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
  ) {
    super();
  }

  async execute(createCustomerDto: CreateCustomerDto): Promise<User> {
    this.policy.can(AbilitiesEnum.CUSTOMERS_INSERT);

    await UserValidations.userAlreadyExistsByEmail(
      createCustomerDto.email,
      this.userRepository,
    );

    const city = await CityValidations.cityExists(
      createCustomerDto.cityUuid,
      this.cityRepository,
    );

    const profile = await this.profileRepository.findByUniqueName(
      ProfileUniqueNameEnum.CUSTOMER,
    );

    const person = await Person.create({
      name: createCustomerDto.name,
      shortName: Helper.shortStringGenerate(createCustomerDto.name),
      birthDate: createCustomerDto.birthDate,
      phone: createCustomerDto.phone,
      zipCode: createCustomerDto.zipCode,
      address: createCustomerDto.address,
      numberAddress: createCustomerDto.numberAddress,
      complement: createCustomerDto.complement,
      district: createCustomerDto.district,
      uf: createCustomerDto.uf,
      cityUuid: city.uuid,
    } as PersonProps);

    const password = await Hash.createHash(
      Helper.generateRandomAlphanumeric().toLowerCase(),
    );

    const user = await User.create({
      personUuid: person.uuid,
      profileUuid: profile.uuid,
      email: createCustomerDto.email,
      password,
      person,
      profile: profile,
    } as UserProps);

    const customer = await Customer.create({
      userUuid: user.uuid,
      verifiedEmail: true,
    } as CustomerProps);

    await this.personRepository.create(person);
    await this.userRepository.create(user);
    await this.customerRepository.create(customer);

    return user;
  }
}
