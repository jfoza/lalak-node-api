import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { LoginUserTypesEnum } from '@/utils/enums/login-user-types.enum';
import { IUserListByEmailLoginUseCase } from '@/features/user/domain/use-cases/user-list-by-email-login.use-case.interface';
import { PersonAuthUser } from '@/features/user/domain/entities/person-auth-user';
import { ProfileUniqueNameEnum } from '@/utils/enums/profile-unique-name.enum';
import { PersonAdminUserRepository } from '@/features/user/domain/repositories/person-admin-user.repository';
import { PersonCustomerRepository } from '@/features/user/domain/repositories/person-customer.repository';

@Injectable()
export class UserListByEmailLoginUseCase
  implements IUserListByEmailLoginUseCase
{
  constructor(
    @Inject(PersonAdminUserRepository)
    private readonly personAdminUserRepository: PersonAdminUserRepository,

    @Inject(PersonCustomerRepository)
    private readonly personCustomerRepository: PersonCustomerRepository,
  ) {}

  async execute(
    email: string,
    loginType: LoginUserTypesEnum,
  ): Promise<PersonAuthUser | null> {
    switch (loginType) {
      case LoginUserTypesEnum.ADMIN:
        return this.getAdminOrFail(email);

      case LoginUserTypesEnum.CUSTOMER:
        return this.getCustomerOrFail(email);

      default:
        throw new UnauthorizedException(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
    }
  }

  private async getAdminOrFail(email: string): Promise<PersonAuthUser | null> {
    const personAuthUser =
      await this.personAdminUserRepository.findOneForLogin(email);

    if (!personAuthUser) {
      return null;
    }

    const haystack = ProfileUniqueNameEnum.ADMIN_USERS;

    if (!haystack.includes(personAuthUser.profile.uniqueName)) {
      throw new UnauthorizedException(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
    }

    return personAuthUser;
  }

  private async getCustomerOrFail(
    email: string,
  ): Promise<PersonAuthUser | null> {
    const personAuthUser =
      await this.personCustomerRepository.findOneForLogin(email);

    if (!personAuthUser) {
      return null;
    }

    if (personAuthUser.profile.uniqueName !== ProfileUniqueNameEnum.CUSTOMER) {
      throw new UnauthorizedException(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
    }

    return personAuthUser;
  }
}
