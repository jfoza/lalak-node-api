import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@/features/auth/presentation/controllers/auth.controller';
import { AuthEntity } from '@/features/auth/infra/database/typeorm/entities/auth.entity';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';
import { UserModule } from '@/features/user/infra/modules/user.module';
import { AuthRepository } from '@/features/auth/infra/database/typeorm/repositories/auth.repository';
import { LoginService } from '@/features/auth/application/services/login.service';
import { AuthMapper } from '@/features/auth/infra/database/typeorm/mappers/auth.mapper';
import { IAuthRepository } from '@/features/auth/domain/repositories/auth.repository.interface';
import { ILoginService } from '@/features/auth/domain/services/login.service.interface';
import { AclModule } from '@/acl/infra/modules/acl.module';
import { JwtAuthService } from '@/jwt/application/services/jwt-auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity, UserEntity]),
    UserModule,
    AclModule,
    JwtModule.registerAsync({
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
    AuthMapper,
    JwtAuthService,
    AuthRepository,
    { provide: IAuthRepository, useExisting: AuthRepository },

    LoginService,
    { provide: ILoginService, useExisting: LoginService },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
