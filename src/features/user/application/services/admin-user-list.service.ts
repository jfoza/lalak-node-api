import { IAdminUserListService } from '@/features/user/domain/services/admin-user-list.service';
import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';
import { Person } from '@/features/user/domain/entities/person';
import { Inject, Injectable } from '@nestjs/common';
import { Application } from '@/common/application/application';
import { IAdminUserListUseCase } from '@/features/user/domain/use-cases/admin-user-list.use-case.interface';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';

@Injectable()
export class AdminUserListService
  extends Application
  implements IAdminUserListService
{
  constructor(
    @Inject(IAdminUserListUseCase)
    private readonly useCase: IAdminUserListUseCase,
  ) {
    super();
  }

  handle(
    adminUserSearchParamsDto: IAdminUserSearchParamsDto,
  ): Promise<Person[]> {
    const policy = this.policy;

    return policy.match<Person[]>([
      {
        has: policy.has(AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_VIEW),
        action: async () =>
          await this.useCase.listUserForAdminMaster(adminUserSearchParamsDto),
      },
      {
        has: policy.has(AbilitiesEnum.ADMIN_USERS_EMPLOYEE_VIEW),
        action: async () =>
          await this.useCase.listUserForEmployee(adminUserSearchParamsDto),
      },
    ]);
  }
}
