import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtAuth } from '@/jwt/domain/entities/jwt-auth';
import { JwtAuthService } from '@/jwt/application/services/jwt-auth.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,

    @Inject(JwtAuthService)
    private readonly jwtAuthService: JwtAuthService,

    @Inject(JwtAuth)
    private readonly jwtAuth: JwtAuth,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
      const token = req.headers['authorization']?.split(' ')[1] || null;

      if (token) {
        try {
          const payload = await this.jwtAuthService.verifyAsync(token, {
            secret: this.configService.get<string>('JWT_SECRET'),
          });

          if (payload) {
            await this.jwtAuth.create(payload.user);
          }
        } catch {}
      }
    }
    next();
  }
}
