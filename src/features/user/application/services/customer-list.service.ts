import { Injectable } from '@nestjs/common';
import { Application } from '@/common/application/application';
import { ICustomerSearchParamsDto } from '@/features/user/domain/dto/customer-search-params.dto.interface';
import { ICustomerListService } from '@/features/user/domain/services/customer-list.service';
import { User } from '@/features/user/domain/entities/user';

@Injectable()
export class CustomerListService
  extends Application
  implements ICustomerListService
{
  async execute(
    customerSearchParamsDto: ICustomerSearchParamsDto,
  ): Promise<User[]> {
    return Promise.resolve(undefined);
  }
}
