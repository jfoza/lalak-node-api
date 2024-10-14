import { LoginUserTypesEnum } from '@/common/infra/enums/login-user-types.enum';
import { User } from '@/features/user/domain/core/user';

export interface IUserListByEmailLoginUseCase {
  execute(email: string, loginType: LoginUserTypesEnum): Promise<User>;
}
