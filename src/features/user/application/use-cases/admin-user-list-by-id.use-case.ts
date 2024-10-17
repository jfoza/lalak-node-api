import { IAdminUserListById } from '@/features/user/domain/use-cases/admin-user-list-by-id.use-case.interface';
import { User } from '@/features/user/domain/core/user';
import { Inject, Injectable } from '@nestjs/common';
import { PolicyUseCase } from '@/common/application/use-cases/policy.use-case';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { IAdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository.interface';
import { AdminUserValidations } from '@/features/user/application/validations/admin-user.validations';
import { ProfileUniqueNameEnum } from '@/common/infra/enums/profile-unique-name.enum';

@Injectable()
export class AdminUserListByIdUseCase
  extends PolicyUseCase
  implements IAdminUserListById
{
  private userUuid: string;

  constructor(
    @Inject('IAdminUserRepository')
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
        this.policy.policyException();
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
