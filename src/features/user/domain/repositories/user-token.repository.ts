import { UserToken } from '@/features/user/domain/entities/user-token';

export interface UserTokenRepository {
  findByToken(token: string): Promise<UserToken>;
  create(userToken: UserToken): Promise<UserToken>;
}

export const UserTokenRepository = Symbol('UserTokenRepository');
