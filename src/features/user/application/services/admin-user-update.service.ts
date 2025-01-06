import { IAdminUserUpdateService } from '@/features/user/domain/services/admin-user-update.service';
import { Person } from '@/features/user/domain/entities/person';
import { IAdminUserUpdateDto } from '@/features/user/domain/dto/admin-user-update.dto.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Application } from '@/common/application/application';
import { IAdminUserUpdateUseCase } from '@/features/user/domain/use-cases/admin-user-update.use-case.interface';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';

@Injectable()
export class AdminUserUpdateService
  extends Application
  implements IAdminUserUpdateService
{
  constructor(
    @Inject(IAdminUserUpdateUseCase)
    private readonly useCase: IAdminUserUpdateUseCase,
  ) {
    super();
  }

  handle(
    uuid: string,
    adminUserUpdateDto: IAdminUserUpdateDto,
  ): Promise<Person> {
    const policy = this.policy;

    return policy.match<Person>([
      {
        has: policy.has(AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_UPDATE),
        action: async () =>
          await this.useCase.updateUserForAdminMaster(uuid, adminUserUpdateDto),
      },
      {
        has: policy.has(AbilitiesEnum.ADMIN_USERS_EMPLOYEE_UPDATE),
        action: async () =>
          await this.useCase.updateUserForAdminMaster(uuid, adminUserUpdateDto),
      },
    ]);
  }
}
