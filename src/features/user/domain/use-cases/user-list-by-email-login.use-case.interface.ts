import { LoginUserTypesEnum } from '@/utils/enums/login-user-types.enum';
import { IAuthUser } from '@/features/auth/domain/services/login.service.interface';

export interface IUserListByEmailLoginUseCase {
  execute(
    email: string,
    loginType: LoginUserTypesEnum,
  ): Promise<IAuthUser | null>;
}

export const IUserListByEmailLoginUseCase = Symbol(
  'IUserListByEmailLoginUseCase',
);
