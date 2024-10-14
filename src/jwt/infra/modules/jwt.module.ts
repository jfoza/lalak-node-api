import { Global, Module } from '@nestjs/common';
import { JwtInfoService } from '@/jwt/application/services/jwt-info.service';
import { JwtAuthService } from '@/jwt/application/services/jwt-auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    NestJwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: +configService.get<number>('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtInfoService, JwtAuthService],
  exports: [JwtInfoService, JwtAuthService],
})
export class JwtModule {}
