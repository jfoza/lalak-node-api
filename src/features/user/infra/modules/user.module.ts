import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { IAdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository.interface';
import { IPersonRepository } from '@/features/user/domain/repositories/person-repository.interface';
import { IUserTokenRepository } from '@/features/user/domain/repositories/user-token.repository.interface';
import { IUserListByEmailLoginUseCase } from '@/features/user/domain/use-cases/user-list-by-email-login.use-case.interface';
import { IProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';
import { IAdminUserListUseCase } from '@/features/user/domain/use-cases/admin-user-list.use-case.interface';
import { IAdminUserListById } from '@/features/user/domain/use-cases/admin-user-list-by-id.use-case.interface';
import { IAdminUserCreateUseCase } from '@/features/user/domain/use-cases/admin-user-create.use-case.interface';
import { IAdminUserUpdateUseCase } from '@/features/user/domain/use-cases/admin-user-update.use-case.interface';
import { ISendForgotPasswordEmailUseCase } from '@/features/user/domain/use-cases/send-forgot-password-email.use-case.interface';
import { IResetPasswordUseCase } from '@/features/user/domain/use-cases/reset-password.use-case.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { PersonEntity } from '@/features/user/infra/database/typeorm/entities/person.entity';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';
import { UserTokenEntity } from '@/features/user/infra/database/typeorm/entities/user-token.entity';
import { ProfileEntity } from '@/features/user/infra/database/typeorm/entities/profile.entity';
import { AdminUserEntity } from '@/features/user/infra/database/typeorm/entities/admin-user.entity';
import { AmqpModule } from '@/amqp/infra/modules/amqp.module';
import { MailModule } from '@/mail/infra/modules/mail.module';
import { AdminUserController } from '@/features/user/presentation/controllers/admin-user.controller';
import { ForgotPasswordController } from '@/features/user/presentation/controllers/forgot-password.controller';
import { SendForgotPasswordEmailJob } from '../../application/jobs/send-forgot-password-email.job';
import { AdminUserMapper } from '../database/typeorm/mappers/admin-user.mapper';
import { PersonMapper } from '@/features/user/infra/database/typeorm/mappers/person.mapper';
import { ProfileMapper } from '@/features/user/infra/database/typeorm/mappers/profile.mapper';
import { UserMapper } from '@/features/user/infra/database/typeorm/mappers/user.mapper';
import { UserTokenMapper } from '../database/typeorm/mappers/user-token.mapper';
import { TypeormUserRepository } from '@/features/user/infra/database/typeorm/repositories/typeorm-user.repository';
import { TypeormAdminUserRepository } from '@/features/user/infra/database/typeorm/repositories/typeorm-admin-user-reporitory';
import { TypeormPersonRepository } from '@/features/user/infra/database/typeorm/repositories/typeorm-person-repository';
import { TypeormProfileRepository } from '@/features/user/infra/database/typeorm/repositories/typeorm-profile.repository';
import { TypeormUserTokenRepository } from '@/features/user/infra/database/typeorm/repositories/typeorm-user-token.repository';
import { UserListByEmailLoginUseCase } from '@/features/user/application/use-cases/user-list-by-email-login.use-case';
import { AdminUserListUseCase } from '@/features/user/application/use-cases/admin-user-list.use-case';
import { AdminUserListByIdUseCase } from '@/features/user/application/use-cases/admin-user-list-by-id.use-case';
import { AdminUserCreateUseCase } from '@/features/user/application/use-cases/admin-user-create.use-case';
import { AdminUserUpdateUseCase } from '@/features/user/application/use-cases/admin-user-update.use-case';
import { SendForgotPasswordEmailUseCase } from '@/features/user/application/use-cases/send-forgot-password-email.use-case';
import { ResetPasswordUseCase } from '@/features/user/application/use-cases/reset-password.use-case';
import { CustomerModule } from '@/features/customer/infra/modules/customer.module';
import { CityModule } from '@/features/city/infra/modules/city.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PersonEntity,
      ProfileEntity,
      UserEntity,
      UserTokenEntity,
      AdminUserEntity,
    ]),
    AmqpModule,
    MailModule,
    CityModule,
    forwardRef(() => CustomerModule),
  ],
  controllers: [AdminUserController, ForgotPasswordController],
  providers: [
    SendForgotPasswordEmailJob,
    AdminUserMapper,
    PersonMapper,
    ProfileMapper,
    UserMapper,
    UserTokenMapper,
    TypeormUserRepository,
    {
      provide: IUserRepository,
      useExisting: TypeormUserRepository,
    },

    TypeormAdminUserRepository,
    {
      provide: IAdminUserRepository,
      useExisting: TypeormAdminUserRepository,
    },

    TypeormPersonRepository,
    {
      provide: IPersonRepository,
      useExisting: TypeormPersonRepository,
    },

    TypeormProfileRepository,
    {
      provide: IProfileRepository,
      useExisting: TypeormProfileRepository,
    },

    TypeormUserTokenRepository,
    {
      provide: IUserTokenRepository,
      useExisting: TypeormUserTokenRepository,
    },

    UserListByEmailLoginUseCase,
    {
      provide: IUserListByEmailLoginUseCase,
      useExisting: UserListByEmailLoginUseCase,
    },

    AdminUserListUseCase,
    {
      provide: IAdminUserListUseCase,
      useExisting: AdminUserListUseCase,
    },

    AdminUserListByIdUseCase,
    {
      provide: IAdminUserListById,
      useExisting: AdminUserListByIdUseCase,
    },

    AdminUserCreateUseCase,
    {
      provide: IAdminUserCreateUseCase,
      useExisting: AdminUserCreateUseCase,
    },

    AdminUserUpdateUseCase,
    {
      provide: IAdminUserUpdateUseCase,
      useExisting: AdminUserUpdateUseCase,
    },

    SendForgotPasswordEmailUseCase,
    {
      provide: ISendForgotPasswordEmailUseCase,
      useExisting: SendForgotPasswordEmailUseCase,
    },

    ResetPasswordUseCase,
    {
      provide: IResetPasswordUseCase,
      useExisting: ResetPasswordUseCase,
    },
  ],
  exports: [
    SendForgotPasswordEmailJob,
    IPersonRepository,
    IUserRepository,
    IProfileRepository,
    IUserListByEmailLoginUseCase,
    UserMapper,
  ],
})
export class UserModule {}
