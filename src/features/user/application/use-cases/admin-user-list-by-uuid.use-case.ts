import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { IAdminUserListByUuidUseCase } from '@/features/user/domain/use-cases/admin-user-list-by-uuid.use-case.interface';
import { AdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository';
import { AdminUserValidations } from '@/features/user/application/validations/admin-user.validations';
import { ProfileUniqueNameEnum } from '@/utils/enums/profile-unique-name.enum';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { User } from '@/features/user/domain/entities/user';

@Injectable()
export class AdminUserListByUuidUseCase implements IAdminUserListByUuidUseCase {
  constructor(
    @Inject(AdminUserRepository)
    private readonly personAdminUserRepository: AdminUserRepository,
  ) {}

  async listUserForAdminMaster(uuid: string): Promise<User> {
    return this.listOrFail(uuid, ProfileUniqueNameEnum.ADMIN_USERS);
  }

  async listUserForEmployee(uuid: string): Promise<User> {
    return this.listOrFail(uuid, ProfileUniqueNameEnum.EMPLOYEE_USERS);
  }

  private async listOrFail(uuid: string, haystack: string[]): Promise<User> {
    const user = await AdminUserValidations.adminUserExistsByUserUuid(
      uuid,
      this.personAdminUserRepository,
    );

    if (!haystack.includes(user.profile.uniqueName)) {
      throw new ForbiddenException(ErrorMessagesEnum.USER_NOT_ALLOWED);
    }

    return user;
  }
}
