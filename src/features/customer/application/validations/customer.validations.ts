import { ICustomerRepository } from '@/features/customer/domain/interfaces/repositories/customer-repository.interface';
import { User } from '@/features/user/domain/core/user';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

export class CustomerValidations {
  static async customerExists(
    uuid: string,
    customerRepository: ICustomerRepository,
  ): Promise<User> {
    const customer = await customerRepository.findByUserUuid(uuid);

    if (!customer) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return customer;
  }
}
