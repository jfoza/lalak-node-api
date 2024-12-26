import * as process from 'node:process';
import { IJwtToken } from '@/jwt/domain/interfaces/jwt-token.interface';
import { JwtService as NestJwtService } from '@nestjs/jwt';

export class JwtAuthService extends NestJwtService {
  authenticate(payload: Buffer | object): IJwtToken {
    const token: string = this.sign(payload);
    const expiration: number = +process.env.JWT_EXPIRATION;
    const type: string = 'JWT';

    return { token, type, expiration };
  }
}
