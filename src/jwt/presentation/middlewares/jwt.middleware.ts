import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { IJwtAuthService } from '@/jwt/domain/services/jwt-auth.service.interface';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,

    @Inject(IJwtAuthService)
    private readonly jwtAuthService: IJwtAuthService,
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
            const { user } = payload;

            await this.jwtAuthService.setAuthUser(user, user.uuid);
          }
        } catch {}
      }
    }
    next();
  }
}
