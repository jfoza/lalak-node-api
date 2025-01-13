import { JwtVerifyOptions } from '@nestjs/jwt/dist/interfaces';
import { IAuthUser } from '@/features/auth/domain/services/login.service.interface';

export interface IJwtToken {
  token: string;
  type: string;
  expiration: number;
}

export interface IJwtAuthService {
  get user(): IAuthUser | null;
  set user(authUser: IAuthUser);
  sign(payload: Buffer | object): IJwtToken;
  verifyAsync(token: string, options?: JwtVerifyOptions): Promise<any>;
}

export const IJwtAuthService = Symbol('IJwtAuthService');
