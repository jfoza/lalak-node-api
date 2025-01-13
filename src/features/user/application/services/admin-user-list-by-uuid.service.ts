import { IAdminUserListByUuidService } from '@/features/user/domain/services/admin-user-list-by-uuid.service';
import { Inject, Injectable } from '@nestjs/common';
import { Application } from '@/common/application/application';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { IAdminUserListByUuidUseCase } from '@/features/user/domain/use-cases/admin-user-list-by-uuid.use-case.interface';
import { User } from '@/features/user/domain/entities/user';

@Injectable()
export class AdminUserListByUuidService
  extends Application
  implements IAdminUserListByUuidService
{
  constructor(
    @Inject(IAdminUserListByUuidUseCase)
    private readonly useCase: IAdminUserListByUuidUseCase,
  ) {
    super();
  }

  handle(uuid: string): Promise<User> {
    const policy = this.policy;

    return policy.match<User>([
      {
        has: policy.has(AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_VIEW),
        action: async () => await this.useCase.listUserForAdminMaster(uuid),
      },
      {
        has: policy.has(AbilitiesEnum.ADMIN_USERS_EMPLOYEE_VIEW),
        action: async () => await this.useCase.listUserForEmployee(uuid),
      },
    ]);
  }
}
