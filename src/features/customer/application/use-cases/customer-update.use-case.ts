import { ICustomerUpdateUseCase } from '@/features/customer/domain/interfaces/use-cases/customer-update.use-case.interface';
import { UpdateCustomerDto } from '@/features/customer/application/dto/update-customer.dto';
import { User } from '@/features/user/domain/core/user';
import { Inject, Injectable } from '@nestjs/common';
import { PolicyUseCase } from '@/common/application/use-cases/policy.use-case';
import { CustomerValidations } from '@/features/customer/application/validations/customer.validations';
import { ICityRepository } from '@/features/city/domain/interfaces/city.repository.interface';
import { IPersonRepository } from '@/features/user/domain/repositories/person-repository.interface';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { ICustomerRepository } from '@/features/customer/domain/interfaces/repositories/customer-repository.interface';
import { UserValidations } from '@/features/user/application/validations/user.validations';
import { CityValidations } from '@/features/city/application/validations/city.validations';
import { Helper } from 'src/common/infra/helpers';

@Injectable()
export class CustomerUpdateUseCase
  extends PolicyUseCase
  implements ICustomerUpdateUseCase
{
  @Inject('ICityRepository')
  private readonly cityRepository: ICityRepository;

  @Inject('IPersonRepository')
  private readonly personRepository: IPersonRepository;

  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  @Inject('ICustomerRepository')
  private readonly customerRepository: ICustomerRepository;

  async execute(
    uuid: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<User> {
    const user = await CustomerValidations.customerExists(
      uuid,
      this.customerRepository,
    );

    await UserValidations.userAlreadyExistsByEmailInUpdate(
      uuid,
      updateCustomerDto.email,
      this.userRepository,
    );

    const city = await CityValidations.cityExists(
      updateCustomerDto.cityUuid,
      this.cityRepository,
    );

    user.person.name = updateCustomerDto.name;
    user.person.shortName = Helper.shortStringGenerate(updateCustomerDto.name);
    user.person.birthDate = updateCustomerDto.birthDate;
    user.person.phone = updateCustomerDto.phone;
    user.person.zipCode = updateCustomerDto.zipCode;
    user.person.address = updateCustomerDto.address;
    user.person.numberAddress = updateCustomerDto.numberAddress;
    user.person.complement = updateCustomerDto.complement;
    user.person.district = updateCustomerDto.district;
    user.person.uf = updateCustomerDto.uf;
    user.person.city = city;
    user.person.cityUuid = city.uuid;

    user.email = updateCustomerDto.email;

    await this.personRepository.update(user.person);
    await this.userRepository.update(user);

    return user;
  }
}
