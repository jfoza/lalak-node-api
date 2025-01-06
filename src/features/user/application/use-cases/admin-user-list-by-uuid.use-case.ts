import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { IAdminUserListByUuidUseCase } from '@/features/user/domain/use-cases/admin-user-list-by-uuid.use-case.interface';
import { Person } from '@/features/user/domain/entities/person';
import { PersonAdminUserRepository } from '@/features/user/domain/repositories/person-admin-user.repository';
import { AdminUserValidations } from '@/features/user/application/validations/admin-user.validations';
import { ProfileUniqueNameEnum } from '@/utils/enums/profile-unique-name.enum';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';

@Injectable()
export class AdminUserListByUuidUseCase implements IAdminUserListByUuidUseCase {
  constructor(
    @Inject(PersonAdminUserRepository)
    private readonly personAdminUserRepository: PersonAdminUserRepository,
  ) {}

  async listUserForAdminMaster(uuid: string): Promise<Person> {
    return this.listOrFail(uuid, ProfileUniqueNameEnum.ADMIN_USERS);
  }

  async listUserForEmployee(uuid: string): Promise<Person> {
    return this.listOrFail(uuid, ProfileUniqueNameEnum.EMPLOYEE_USERS);
  }

  private async listOrFail(uuid: string, haystack: string[]): Promise<Person> {
    const person = await AdminUserValidations.adminUserExistsByUserUuid(
      uuid,
      this.personAdminUserRepository,
    );

    const { profile } = person.user;

    if (!haystack.includes(profile.uniqueName)) {
      throw new ForbiddenException(ErrorMessagesEnum.USER_NOT_ALLOWED);
    }

    return person;
  }
}
