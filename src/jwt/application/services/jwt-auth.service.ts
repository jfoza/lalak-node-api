import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Injectable, Scope } from '@nestjs/common';
import { JwtVerifyOptions } from '@nestjs/jwt/dist/interfaces';
import {
  IJwtAuthService,
  IJwtToken,
} from '@/jwt/domain/services/jwt-auth.service.interface';
import { IAuthUser } from '@/features/auth/domain/services/login.service.interface';

@Injectable({ scope: Scope.REQUEST })
export class JwtAuthService implements IJwtAuthService {
  private authUser: IAuthUser;

  constructor(private readonly nestJwtService: NestJwtService) {}

  get user(): IAuthUser | null {
    if (!this.authUser) {
      return null;
    }

    return this.authUser;
  }

  set user(authUser: IAuthUser) {
    const {
      userUuid,
      name,
      email,
      password,
      shortName,
      profileUuid,
      profileDescription,
      profileUniqueName,
      active,
      createdAt,
      birthDate,
      phone,
      zipCode,
      address,
      numberAddress,
      complement,
      district,
      uf,
      cityUuid,
      cityDescription,
    } = authUser;

    this.authUser = {
      userUuid,
      name,
      email,
      password,
      shortName,
      profileUuid,
      profileDescription,
      profileUniqueName,
      active,
      createdAt,
      birthDate,
      phone,
      zipCode,
      address,
      numberAddress,
      complement,
      district,
      uf,
      cityUuid,
      cityDescription,
    };
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
