import { ICustomerListUseCase } from '@/features/customer/domain/use-cases/customer-list.use-case.interface';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Application } from '@/common/application/application';
import { ICustomerRepository } from '@/features/customer/domain/repositories/customer-repository.interface';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { ICustomerSearchParamsDto } from '@/features/customer/domain/dto/customer-search-params.dto.interface';

@Injectable()
export class CustomerListUseCase
  extends Application
  implements ICustomerListUseCase
{
  constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {
    super();
  }

  async execute(
    customerSearchParamsDto: ICustomerSearchParamsDto,
  ): Promise<ILengthAwarePaginator> {
    this.policy.can(AbilitiesEnum.CUSTOMERS_VIEW);

    return await this.customerRepository.paginate(customerSearchParamsDto);
  }
}
