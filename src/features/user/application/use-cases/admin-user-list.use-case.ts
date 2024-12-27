import { IAdminUserListUseCase } from '@/features/user/domain/use-cases/admin-user-list.use-case.interface';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IAdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository.interface';
import { Application } from '@/common/application/application';
import { AbilitiesEnum } from '@/utils/enums/abilities.enum';
import { ProfileUniqueNameEnum } from '@/utils/enums/profile-unique-name.enum';
import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';
import { AclForbiddenException } from '@/common/domain/exceptions/acl.forbbiden.exception';

@Injectable()
export class AdminUserListUseCase
  extends Application
  implements IAdminUserListUseCase
{
  private adminUserSearchParamsDto: IAdminUserSearchParamsDto;

  constructor(
    @Inject(IAdminUserRepository)
    private readonly adminUserRepository: IAdminUserRepository,
  ) {
    super();
  }

  async execute(
    adminUserSearchParamsDto: IAdminUserSearchParamsDto,
  ): Promise<ILengthAwarePaginator> {
    this.adminUserSearchParamsDto = adminUserSearchParamsDto;

    switch (true) {
      case this.policy.has(AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_VIEW):
        return this.findAllByAdminMaster();

      case this.policy.has(AbilitiesEnum.ADMIN_USERS_EMPLOYEE_VIEW):
        return this.findAllByEmployee();

      default:
        throw new AclForbiddenException();
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
