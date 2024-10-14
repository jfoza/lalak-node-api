import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';
import { IJwtToken } from '@/jwt/domain/interfaces/jwt-token.interface';

export class JwtAuthService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  authenticate(payload: Buffer | object): IJwtToken {
    const token: string = this.jwtService.sign(payload);
    const expiration: number = +process.env.JWT_EXPIRATION;
    const type: string = 'JWT';

    return { token, type, expiration };
  }
}
