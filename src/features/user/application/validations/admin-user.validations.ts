import { IAdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

export class AdminUserValidations {
  static async adminUserExistsByUserUuid(
    uuid: string,
    adminUserRepository: IAdminUserRepository,
  ) {
    const adminUser = await adminUserRepository.findByUserUuid(uuid);

    if (!adminUser) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return adminUser;
  }
}
