import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { LoginUserTypesEnum } from '@/common/infra/enums/login-user-types.enum';
import { IUserListByEmailLoginUseCase } from '@/features/user/domain/use-cases/user-list-by-email-login.use-case.interface';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { User } from '@/features/user/domain/core/user';

@Injectable()
export class UserListByEmailLoginUseCase
  implements IUserListByEmailLoginUseCase
{
  private user: User;

  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string, loginType: LoginUserTypesEnum): Promise<User> {
    this.user = await this.userRepository.findByEmailInLogin(email);

    if (loginType === LoginUserTypesEnum.ADMIN) {
      this.adminValidation();
    }

    if (loginType === LoginUserTypesEnum.CUSTOMER) {
      this.customerValidation();
    }

    return this.user;
  }

  private adminValidation(): void {
    if (!this.user) {
      throw new UnauthorizedException(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
    }

    if (!this.user.adminUser) {
      throw new UnauthorizedException(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
    }
  }

  private customerValidation(): void {
    if (!this.user) {
      throw new UnauthorizedException(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
    }

    if (!this.user.customer) {
      throw new UnauthorizedException(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
    }
  }
}
