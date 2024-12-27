import { ICustomerCreateUseCase } from '@/features/customer/domain/use-cases/customer-create.use-case.interface';
import { User, UserProps } from '@/features/user/domain/entities/user';
import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from '@/features/customer/domain/repositories/customer-repository.interface';
import { IPersonRepository } from '@/features/user/domain/repositories/person-repository.interface';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { IProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';
import { Application } from '@/common/application/application';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { UserValidations } from '@/features/user/application/validations/user.validations';
import { ProfileUniqueNameEnum } from '@/utils/enums/profile-unique-name.enum';
import { Person, PersonProps } from '@/features/user/domain/entities/person';
import { Helper } from 'src/utils/helpers';
import { Hash } from '@/utils/hash';
import {
  Customer,
  CustomerProps,
} from '@/features/customer/domain/entities/customer';
import { CityValidations } from '@/features/city/application/validations/city.validations';
import { ICityRepository } from '@/features/city/domain/interfaces/city.repository.interface';
import { ICreateCustomerDto } from '@/features/customer/domain/dto/create-customer.dto.interface';

@Injectable()
export class CustomerCreateUseCase
  extends Application
  implements ICustomerCreateUseCase
{
  constructor(
    @Inject(IProfileRepository)
    private readonly profileRepository: IProfileRepository,

    @Inject(ICityRepository)
    private readonly cityRepository: ICityRepository,

    @Inject(IPersonRepository)
    private readonly personRepository: IPersonRepository,

    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,

    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {
    super();
  }

  async execute(createCustomerDto: ICreateCustomerDto): Promise<User> {
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
      birthDate: new Date(createCustomerDto.birthDate),
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
