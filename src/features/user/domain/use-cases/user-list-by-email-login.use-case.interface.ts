import { LoginUserTypesEnum } from '@/utils/enums/login-user-types.enum';
import { User } from '@/features/user/domain/entities/user';

export interface IUserListByEmailLoginUseCase {
  execute(email: string, loginType: LoginUserTypesEnum): Promise<User>;
}

export const IUserListByEmailLoginUseCase = Symbol(
  'IUserListByEmailLoginUseCase',
);
