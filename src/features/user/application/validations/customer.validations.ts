import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { CustomerRepository } from '@/features/user/domain/repositories/customer.repository';
import { User } from '@/features/user/domain/entities/user';

export class CustomerValidations {
  static async customerExists(
    uuid: string,
    customerRepository: CustomerRepository,
  ): Promise<User> {
    const user = await customerRepository.findByUuid(uuid);

    if (!user) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return user;
  }
}
