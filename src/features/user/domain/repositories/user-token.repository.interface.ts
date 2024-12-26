import { UserToken } from '@/features/user/domain/entities/user-token';

export interface IUserTokenRepository {
  findByToken(token: string): Promise<UserToken>;
  create(userToken: UserToken): Promise<UserToken>;
}

export const IUserTokenRepository = Symbol('IUserTokenRepository');
