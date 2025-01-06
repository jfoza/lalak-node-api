import { Injectable } from '@nestjs/common';
import { Application } from '@/common/application/application';
import { ICustomerSearchParamsDto } from '@/features/user/domain/dto/customer-search-params.dto.interface';
import { Person } from '@/features/user/domain/entities/person';
import { ICustomerListService } from '@/features/user/domain/services/customer-list.service';

@Injectable()
export class CustomerListService
  extends Application
  implements ICustomerListService
{
  async execute(
    customerSearchParamsDto: ICustomerSearchParamsDto,
  ): Promise<Person[]> {
    return Promise.resolve(undefined);
  }
}
