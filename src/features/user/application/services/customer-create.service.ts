import { Injectable } from '@nestjs/common';
import { Application } from '@/common/application/application';
import { ICustomerCreateDto } from '@/features/user/domain/dto/customer-create.dto.interface';
import { Person } from '@/features/user/domain/entities/person';
import { ICustomerCreateService } from '@/features/user/domain/services/customer-create.service';

@Injectable()
export class CustomerCreateService
  extends Application
  implements ICustomerCreateService
{
  async execute(customerCreateDto: ICustomerCreateDto): Promise<Person> {
    return Promise.resolve(undefined);
  }
}
