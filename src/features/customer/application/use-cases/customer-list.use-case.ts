import { ICustomerListUseCase } from '@/features/customer/domain/interfaces/use-cases/customer-list.use-case.interface';
import { CustomerSearchParamsDto } from '@/features/customer/application/dto/customer-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Application } from '@/common/application/use-cases/application';
import { ICustomerRepository } from '@/features/customer/domain/interfaces/repositories/customer-repository.interface';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';

@Injectable()
export class CustomerListUseCase
  extends Application
  implements ICustomerListUseCase
{
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
  ) {
    super();
  }

  async execute(
    customerSearchParamsDto: CustomerSearchParamsDto,
  ): Promise<ILengthAwarePaginator> {
    this.policy.can(AbilitiesEnum.CUSTOMERS_VIEW);

    return await this.customerRepository.paginate(customerSearchParamsDto);
  }
}
