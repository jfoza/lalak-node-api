import { JwtVerifyOptions } from '@nestjs/jwt/dist/interfaces';
import { IJwtToken } from '@/jwt/application/services/jwt-auth.service';
import { PersonAuthUser } from '@/features/user/domain/entities/person-auth-user';

export interface IJwtAuthService {
  get user(): PersonAuthUser | null;
  set user(personAuthUser: PersonAuthUser);
  sign(payload: Buffer | object): IJwtToken;
  verifyAsync(token: string, options?: JwtVerifyOptions): Promise<any>;
}

export const IJwtAuthService = Symbol('IJwtAuthService');
