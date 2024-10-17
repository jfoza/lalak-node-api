import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtInfoService } from '@/jwt/application/services/jwt-info.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly jwtInfoService: JwtInfoService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
      const token = req.headers['authorization']?.split(' ')[1] || null;

      if (token) {
        try {
          const payload = await this.jwtService.verifyAsync(token, {
            secret: this.configService.get<string>('JWT_SECRET'),
          });

          if (payload) {
            this.jwtInfoService.user = payload.user;
          }
        } catch {}
      }
    }
    next();
  }
}
