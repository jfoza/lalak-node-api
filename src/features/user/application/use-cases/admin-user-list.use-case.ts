import { IAdminUserListUseCase } from '@/features/user/domain/use-cases/admin-user-list.use-case.interface';
import { AdminUserSearchParamsDto } from '@/features/user/application/dto/admin-user-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IAdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository.interface';
import { Application } from '@/common/application/use-cases/application';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { ProfileUniqueNameEnum } from '@/common/infra/enums/profile-unique-name.enum';

@Injectable()
export class AdminUserListUseCase
  extends Application
  implements IAdminUserListUseCase
{
  private adminUserSearchParamsDto: AdminUserSearchParamsDto;

  constructor(
    @Inject('IAdminUserRepository')
    private readonly adminUserRepository: IAdminUserRepository,
  ) {
    super();
  }

  async execute(
    adminUserSearchParamsDto: AdminUserSearchParamsDto,
  ): Promise<ILengthAwarePaginator> {
    this.adminUserSearchParamsDto = adminUserSearchParamsDto;

    switch (true) {
      case this.policy.has(AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_VIEW):
        return this.findAllByAdminMaster();

      case this.policy.has(AbilitiesEnum.ADMIN_USERS_EMPLOYEE_VIEW):
        return this.findAllByEmployee();

      default:
        this.policy.policyException();
    }
  }

  private async findAllByAdminMaster(): Promise<ILengthAwarePaginator> {
    this.adminUserSearchParamsDto.profilesUniqueName = [
      ProfileUniqueNameEnum.ADMIN_MASTER,
      ProfileUniqueNameEnum.EMPLOYEE,
    ];

    return await this.adminUserRepository.paginate(
      this.adminUserSearchParamsDto,
    );
  }

  private async findAllByEmployee(): Promise<ILengthAwarePaginator> {
    this.adminUserSearchParamsDto.profilesUniqueName = [
      ProfileUniqueNameEnum.EMPLOYEE,
    ];

    return await this.adminUserRepository.paginate(
      this.adminUserSearchParamsDto,
    );
  }
}
