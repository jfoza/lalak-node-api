import { User } from '@/features/user/domain/core/user';
import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from '@/features/customer/domain/interfaces/repositories/customer-repository.interface';
import { CustomerValidations } from '@/features/customer/application/validations/customer.validations';
import { Application } from '@/common/application/use-cases/application';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { ICustomerListByIdUseCase } from '@/features/customer/domain/interfaces/use-cases/customer-list-by-id.use-case.interface';

@Injectable()
export class CustomerListByIdUseCase
  extends Application
  implements ICustomerListByIdUseCase
{
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
  ) {
    super();
  }

  async execute(userUuid: string): Promise<User> {
    this.policy.can(AbilitiesEnum.CUSTOMERS_VIEW);

    return await CustomerValidations.customerExists(
      userUuid,
      this.customerRepository,
    );
  }
}
