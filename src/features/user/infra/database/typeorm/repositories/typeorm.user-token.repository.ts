import { UserTokenRepository } from '@/features/user/domain/repositories/user-token.repository';
import { UserToken } from '@/features/user/domain/entities/user-token';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormUserTokenRepository implements UserTokenRepository {
  create(userToken: UserToken): Promise<UserToken> {
    return Promise.resolve(undefined);
  }

  findByToken(token: string): Promise<UserToken> {
    return Promise.resolve(undefined);
  }
}
