import { JwtVerifyOptions } from '@nestjs/jwt/dist/interfaces';
import { User, UserProps } from '@/features/user/domain/entities/user';
import { IJwtToken } from '@/jwt/application/services/jwt-auth.service';

export interface IJwtAuthService {
  setAuthUser(userProps: UserProps, uuid: string): Promise<void>;
  sign(payload: Buffer | object): IJwtToken;
  verifyAsync(token: string, options?: JwtVerifyOptions): Promise<any>;
  user(relation?: string | null): Promise<User | null>;
}

export const IJwtAuthService = Symbol('IJwtAuthService');
