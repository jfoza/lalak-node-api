import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { Person } from '@/features/user/domain/entities/person';
import { PersonAdminUserRepository } from '@/features/user/domain/repositories/person-admin-user.repository';

export class AdminUserValidations {
  static async adminUserExistsByUserUuid(
    uuid: string,
    personAdminUserRepository: PersonAdminUserRepository,
  ): Promise<Person> {
    const person = await personAdminUserRepository.findByUuid(uuid);

    if (!person) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return person;
  }
}
