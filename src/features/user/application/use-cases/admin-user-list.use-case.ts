import { IAdminUserListUseCase } from '@/features/user/domain/use-cases/admin-user-list.use-case.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';
import { AdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository';
import { ProfileUniqueNameEnum } from '@/utils/enums/profile-unique-name.enum';
import { User } from '@/features/user/domain/entities/user';

@Injectable()
export class AdminUserListUseCase implements IAdminUserListUseCase {
  constructor(
    @Inject(AdminUserRepository)
    private readonly personAdminUserRepository: AdminUserRepository,
  ) {}

  async listUserForAdminMaster(
    adminUserSearchParamsDto: IAdminUserSearchParamsDto,
  ): Promise<User[]> {
    adminUserSearchParamsDto.profilesUniqueName =
      ProfileUniqueNameEnum.ADMIN_USERS;

    return await this.personAdminUserRepository.findAll(
      adminUserSearchParamsDto,
    );
  }

  async listUserForEmployee(
    adminUserSearchParamsDto: IAdminUserSearchParamsDto,
  ): Promise<User[]> {
    adminUserSearchParamsDto.profilesUniqueName =
      ProfileUniqueNameEnum.EMPLOYEE_USERS;

    return await this.personAdminUserRepository.findAll(
      adminUserSearchParamsDto,
    );
  }
}
