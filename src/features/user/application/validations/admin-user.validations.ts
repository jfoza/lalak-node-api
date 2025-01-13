import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { AdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository';
import { User } from '@/features/user/domain/entities/user';

export class AdminUserValidations {
  static async adminUserExistsByUserUuid(
    uuid: string,
    personAdminUserRepository: AdminUserRepository,
  ): Promise<User> {
    const user = await personAdminUserRepository.findByUuid(uuid);

    if (!user) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return user;
  }
}
