import { Injectable } from '@nestjs/common';
import { Application } from '@/common/application/application';
import { ICustomerListByUuidService } from '@/features/user/domain/services/customer-list-by-uuid.service';
import { User } from '@/features/user/domain/entities/user';

@Injectable()
export class CustomerListByUuidService
  extends Application
  implements ICustomerListByUuidService
{
  async execute(uuid: string): Promise<User> {
    return Promise.resolve(undefined);
  }
}
