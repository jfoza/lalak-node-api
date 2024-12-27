import { Global, Module } from '@nestjs/common';
import { JwtAuthService } from '@/jwt/application/services/jwt-auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { UserModule } from '@/features/user/infra/modules/user.module';
import { IJwtAuthService } from '@/jwt/domain/services/jwt-auth.service.interface';

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
  providers: [
    JwtAuthService,
    {
      provide: IJwtAuthService,
      useClass: JwtAuthService,
    },
  ],
  exports: [IJwtAuthService],
})
export class JwtModule {}
