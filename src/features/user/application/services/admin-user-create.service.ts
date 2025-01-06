import { IAdminUserCreateService } from '@/features/user/domain/services/admin-user-create.service';
import { Inject, Injectable } from '@nestjs/common';
import { IAdminUserCreateUseCase } from '@/features/user/domain/use-cases/admin-user-create.use-case.interface';
import { Person } from '@/features/user/domain/entities/person';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { Application } from '@/common/application/application';
import { IAdminUserCreateDto } from '@/features/user/domain/dto/admin-user-create.dto.interface';

@Injectable()
export class AdminUserCreateService
  extends Application
  implements IAdminUserCreateService
{
  constructor(
    @Inject(IAdminUserCreateUseCase)
    private readonly useCase: IAdminUserCreateUseCase,
  ) {
    super();
  }

  async handle(adminUserCreateDto: IAdminUserCreateDto): Promise<Person> {
    const policy = this.policy;

    return policy.match<Person>([
      {
        has: policy.has(AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_INSERT),
        action: async () =>
          await this.useCase.createUserForAdminMaster(adminUserCreateDto),
      },
      {
        has: policy.has(AbilitiesEnum.ADMIN_USERS_EMPLOYEE_INSERT),
        action: async () =>
          await this.useCase.createUserForEmployee(adminUserCreateDto),
      },
    ]);
  }
}
