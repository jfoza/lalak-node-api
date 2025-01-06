import { Injectable } from '@nestjs/common';
import { Application } from '@/common/application/application';
import { ICustomerListByUuidService } from '@/features/user/domain/services/customer-list-by-uuid.service';
import { Person } from '@/features/user/domain/entities/person';

@Injectable()
export class CustomerListByUuidService
  extends Application
  implements ICustomerListByUuidService
{
  async execute(uuid: string): Promise<Person> {
    return Promise.resolve(undefined);
  }
}
