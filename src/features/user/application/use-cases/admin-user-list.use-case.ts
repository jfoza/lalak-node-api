import { IAdminUserListUseCase } from '@/features/user/domain/use-cases/admin-user-list.use-case.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';
import { Person } from '@/features/user/domain/entities/person';
import { PersonAdminUserRepository } from '@/features/user/domain/repositories/person-admin-user.repository';
import { ProfileUniqueNameEnum } from '@/utils/enums/profile-unique-name.enum';

@Injectable()
export class AdminUserListUseCase implements IAdminUserListUseCase {
  constructor(
    @Inject(PersonAdminUserRepository)
    private readonly personAdminUserRepository: PersonAdminUserRepository,
  ) {}

  async listUserForAdminMaster(
    adminUserSearchParamsDto: IAdminUserSearchParamsDto,
  ): Promise<Person[]> {
    adminUserSearchParamsDto.profilesUniqueName =
      ProfileUniqueNameEnum.ADMIN_USERS;

    return await this.personAdminUserRepository.findAll(
      adminUserSearchParamsDto,
    );
  }

  async listUserForEmployee(
    adminUserSearchParamsDto: IAdminUserSearchParamsDto,
  ): Promise<Person[]> {
    adminUserSearchParamsDto.profilesUniqueName =
      ProfileUniqueNameEnum.EMPLOYEE_USERS;

    return await this.personAdminUserRepository.findAll(
      adminUserSearchParamsDto,
    );
  }
}
