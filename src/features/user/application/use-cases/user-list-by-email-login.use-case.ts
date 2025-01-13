import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { LoginUserTypesEnum } from '@/utils/enums/login-user-types.enum';
import { IUserListByEmailLoginUseCase } from '@/features/user/domain/use-cases/user-list-by-email-login.use-case.interface';
import { ProfileUniqueNameEnum } from '@/utils/enums/profile-unique-name.enum';
import { AdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository';
import { CustomerRepository } from '@/features/user/domain/repositories/customer.repository';
import { IAuthUser } from '@/features/auth/domain/services/login.service.interface';

@Injectable()
export class UserListByEmailLoginUseCase
  implements IUserListByEmailLoginUseCase
{
  constructor(
    @Inject(AdminUserRepository)
    private readonly personAdminUserRepository: AdminUserRepository,

    @Inject(CustomerRepository)
    private readonly personCustomerRepository: CustomerRepository,
  ) {}

  async execute(
    email: string,
    loginType: LoginUserTypesEnum,
  ): Promise<IAuthUser | null> {
    switch (loginType) {
      case LoginUserTypesEnum.ADMIN:
        return this.getAdminOrFail(email);

      case LoginUserTypesEnum.CUSTOMER:
        return this.getCustomerOrFail(email);

      default:
        throw new UnauthorizedException(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
    }
  }

  private async getAdminOrFail(userEmail: string): Promise<IAuthUser | null> {
    const user =
      await this.personAdminUserRepository.findOneForLogin(userEmail);

    if (!user) {
      return null;
    }

    const haystack = ProfileUniqueNameEnum.ADMIN_USERS;

    if (!haystack.includes(user.profile.uniqueName)) {
      throw new UnauthorizedException(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
    }

    const { person, profile } = user;

    return {
      userUuid: user.uuid,
      name: person.name,
      email: user.email,
      password: user.password,
      shortName: person.shortName,
      profileUuid: user.profileUuid,
      profileDescription: profile.description,
      profileUniqueName: profile.uniqueName,
      active: user.active,
      createdAt: user.createdAt,
    };
  }

  private async getCustomerOrFail(
    userEmail: string,
  ): Promise<IAuthUser | null> {
    const user = await this.personCustomerRepository.findOneForLogin(userEmail);

    if (!user) {
      return null;
    }

    if (user.profile.uniqueName !== ProfileUniqueNameEnum.CUSTOMER) {
      throw new UnauthorizedException(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
    }

    const { person, profile } = user;

    return {
      userUuid: user.uuid,
      name: person.name,
      email: user.email,
      password: user.password,
      shortName: person.shortName,
      profileUuid: user.profileUuid,
      profileDescription: profile.description,
      profileUniqueName: profile.uniqueName,
      active: user.active,
      createdAt: user.createdAt,

      birthDate: person.birthDate,
      phone: person.phone,
      zipCode: person.zipCode,
      address: person.address,
      numberAddress: person.numberAddress,
      complement: person.complement,
      district: person.district,
      uf: person.uf,
      cityUuid: person.cityUuid,
      cityDescription: person.city.description,
    };
  }
}
