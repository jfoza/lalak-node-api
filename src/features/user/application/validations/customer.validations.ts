import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { PersonCustomerRepository } from '@/features/user/domain/repositories/person-customer.repository';
import { Person } from '@/features/user/domain/entities/person';

export class CustomerValidations {
  static async customerExists(
    uuid: string,
    customerRepository: PersonCustomerRepository,
  ): Promise<Person> {
    const customer = await customerRepository.findByUuid(uuid);

    if (!customer) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return customer;
  }
}
