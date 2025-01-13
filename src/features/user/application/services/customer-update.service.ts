import { Injectable } from '@nestjs/common';
import { Application } from '@/common/application/application';
import { ICustomerUpdateDto } from '@/features/user/domain/dto/customer-update.dto.interface';
import { ICustomerUpdateService } from '@/features/user/domain/services/customer-update.service';
import { User } from '@/features/user/domain/entities/user';

@Injectable()
export class CustomerUpdateService
  extends Application
  implements ICustomerUpdateService
{
  async execute(
    uuid: string,
    updateCustomerDto: ICustomerUpdateDto,
  ): Promise<User> {
    return Promise.resolve(undefined);
  }
}
