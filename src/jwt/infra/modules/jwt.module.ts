import { Global, Module } from '@nestjs/common';
import { JwtInfoService } from '@/jwt/application/services/jwt-info.service';
import { JwtAuthService } from '@/jwt/application/services/jwt-auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { UserModule } from '@/features/user/infra/modules/user.module';
import { JwtAuth } from '@/jwt/domain/entities/jwt-auth';

@Global()
@Module({
  imports: [
    UserModule,

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
  providers: [JwtInfoService, JwtAuthService, JwtAuth],
  exports: [JwtInfoService, JwtAuthService, JwtAuth],
})
export class JwtModule {}
