import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Injectable, Scope } from '@nestjs/common';
import { JwtVerifyOptions } from '@nestjs/jwt/dist/interfaces';
import { IJwtAuthService } from '@/jwt/domain/services/jwt-auth.service.interface';
import { PersonAuthUser } from '@/features/user/domain/entities/person-auth-user';

export interface IJwtToken {
  token: string;
  type: string;
  expiration: number;
}

@Injectable({ scope: Scope.REQUEST })
export class JwtAuthService implements IJwtAuthService {
  private authUser: PersonAuthUser;

  constructor(private readonly nestJwtService: NestJwtService) {}

  get user(): PersonAuthUser | null {
    if (!this.authUser) {
      return null;
    }

    return this.authUser;
  }

  set user(personAuthUser: PersonAuthUser) {
    this.authUser = personAuthUser;
  }

  sign(payload: Buffer | object): IJwtToken {
    const token: string = this.nestJwtService.sign(payload);
    const expiration: number = +process.env.JWT_EXPIRATION;
    const type: string = 'JWT';

    return { token, type, expiration };
  }

  async verifyAsync(token: string, options?: JwtVerifyOptions): Promise<any> {
    return await this.nestJwtService.verifyAsync(token, options);
  }
}
