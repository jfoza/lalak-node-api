import { Injectable } from '@nestjs/common';
import { Application } from '@/common/application/application';
import { ICustomerUpdateDto } from '@/features/user/domain/dto/customer-update.dto.interface';
import { ICustomerUpdateService } from '@/features/user/domain/services/customer-update.service';
import { Person } from '@/features/user/domain/entities/person';

@Injectable()
export class CustomerUpdateService
  extends Application
  implements ICustomerUpdateService
{
  async execute(
    uuid: string,
    updateCustomerDto: ICustomerUpdateDto,
  ): Promise<Person> {
    return Promise.resolve(undefined);
  }
}
