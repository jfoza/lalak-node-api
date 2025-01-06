import { LoginUserTypesEnum } from '@/utils/enums/login-user-types.enum';
import { PersonAuthUser } from '@/features/user/domain/entities/person-auth-user';

export interface IUserListByEmailLoginUseCase {
  execute(
    email: string,
    loginType: LoginUserTypesEnum,
  ): Promise<PersonAuthUser | null>;
}

export const IUserListByEmailLoginUseCase = Symbol(
  'IUserListByEmailLoginUseCase',
);
