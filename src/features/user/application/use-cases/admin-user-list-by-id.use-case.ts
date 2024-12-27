import { IAdminUserListById } from '@/features/user/domain/use-cases/admin-user-list-by-id.use-case.interface';
import { User } from '@/features/user/domain/entities/user';
import { Inject, Injectable } from '@nestjs/common';
import { Application } from '@/common/application/application';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { IAdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository.interface';
import { AdminUserValidations } from '@/features/user/application/validations/admin-user.validations';
import { ProfileUniqueNameEnum } from '@/utils/enums/profile-unique-name.enum';
import { AclForbiddenException } from '@/common/domain/exceptions/acl.forbbiden.exception';

@Injectable()
export class AdminUserListByIdUseCase
  extends Application
  implements IAdminUserListById
{
  private userUuid: string;

  constructor(
    @Inject(IAdminUserRepository)
    private readonly adminUserRepository: IAdminUserRepository,
  ) {
    super();
  }

  async execute(userUuid: string): Promise<User> {
    this.userUuid = userUuid;

    switch (true) {
      case this.policy.has(AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_VIEW):
        return this.findByAdminMaster();

      case this.policy.has(AbilitiesEnum.ADMIN_USERS_EMPLOYEE_VIEW):
        return this.findByEmployee();

      default:
        throw new AclForbiddenException();
    }
  }

  private async findByAdminMaster(): Promise<User> {
    const user = await AdminUserValidations.adminUserExistsByUserUuid(
      this.userUuid,
      this.adminUserRepository,
    );

    this.profileHierarchyValidation(user.profile.uniqueName, [
      ProfileUniqueNameEnum.ADMIN_MASTER,
      ProfileUniqueNameEnum.EMPLOYEE,
    ]);

    return user;
  }

  private async findByEmployee(): Promise<User> {
    const user = await AdminUserValidations.adminUserExistsByUserUuid(
      this.userUuid,
      this.adminUserRepository,
    );

    this.profileHierarchyValidation(user.profile.uniqueName, [
      ProfileUniqueNameEnum.EMPLOYEE,
    ]);

    return user;
  }
}
