import { Injectable } from '@nestjs/common';
import { Application } from '@/common/application/application';
import { ICustomerCreateDto } from '@/features/user/domain/dto/customer-create.dto.interface';
import { ICustomerCreateService } from '@/features/user/domain/services/customer-create.service';
import { User } from '@/features/user/domain/entities/user';

@Injectable()
export class CustomerCreateService
  extends Application
  implements ICustomerCreateService
{
  async execute(customerCreateDto: ICustomerCreateDto): Promise<User> {
    return Promise.resolve(undefined);
  }
}
