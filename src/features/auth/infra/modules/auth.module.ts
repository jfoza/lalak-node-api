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

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity, UserEntity]),
    UserModule,
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
    AuthRepository,
    { provide: 'IAuthRepository', useExisting: AuthRepository },

    LoginService,
    { provide: 'ILoginService', useExisting: LoginService },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
