import { UserToken } from '@/features/user/domain/core/user-token';

export interface IUserTokenRepository {
  findByToken(token: string): Promise<UserToken>;
  create(userToken: UserToken): Promise<UserToken>;
}
