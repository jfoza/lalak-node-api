import { User, UserProps } from '@/features/user/domain/core/user';
import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from '@/features/customer/domain/interfaces/repositories/customer-repository.interface';
import { IPersonRepository } from '@/features/user/domain/repositories/person-repository.interface';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { IProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';
import { ProfileUniqueNameEnum } from '@/common/infra/enums/profile-unique-name.enum';
import { Person, PersonProps } from '@/features/user/domain/core/person';
import { Helper } from 'src/common/infra/helpers';
import {
  Customer,
  CustomerProps,
} from '@/features/customer/domain/core/customer';
import { ICityRepository } from '@/features/city/domain/interfaces/city.repository.interface';
import { IManyCustomersCreateUseCase } from '@/features/customer/domain/interfaces/use-cases/many-customers-create.use-case.interface';
import { customers } from '@/database/infra/typeorm/seeders/data/customers';

@Injectable()
export class ManyCustomersCreateUseCase implements IManyCustomersCreateUseCase {
  @Inject('IProfileRepository')
  private readonly profileRepository: IProfileRepository;

  @Inject('ICityRepository')
  private readonly cityRepository: ICityRepository;

  @Inject('IPersonRepository')
  private readonly personRepository: IPersonRepository;

  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  @Inject('ICustomerRepository')
  private readonly customerRepository: ICustomerRepository;

  async execute(): Promise<void> {
    const profile = await this.profileRepository.findByUniqueName(
      ProfileUniqueNameEnum.CUSTOMER,
    );

    for (const item of customers) {
      const city = await this.cityRepository.findByDescription(item.city);

      if (!city) {
        debug(item);
      }

      const person = await Person.create({
        name: item.name,
        shortName: Helper.shortStringGenerate(item.name),
        phone: Helper.removeSpecialCharacters(item.phone),
        zipCode: Helper.removeSpecialCharacters(item.zip_code),
        address: item.address,
        numberAddress: item.number,
        district: item.district,
        complement: item.complement,
        cityUuid: city.uuid,
      } as PersonProps);

      const user = await User.create({
        personUuid: person.uuid,
        profileUuid: profile.uuid,
        email: item.email,
        password: item.password,
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
    }
  }
}
