import { IUserListByEmailLoginUseCase } from '@/features/user/domain/use-cases/user-list-by-email-login.use-case.interface';
import { IAdminUserListUseCase } from '@/features/user/domain/use-cases/admin-user-list.use-case.interface';
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
import { UserListByEmailLoginUseCase } from '@/features/user/application/use-cases/user-list-by-email-login.use-case';
import { AdminUserListUseCase } from '@/features/user/application/use-cases/admin-user-list.use-case';
import { AdminUserCreateUseCase } from '@/features/user/application/use-cases/admin-user-create.use-case';
import { AdminUserUpdateUseCase } from '@/features/user/application/use-cases/admin-user-update.use-case';
import { SendForgotPasswordEmailUseCase } from '@/features/user/application/use-cases/send-forgot-password-email.use-case';
import { ResetPasswordUseCase } from '@/features/user/application/use-cases/reset-password.use-case';
import { CustomerModule } from '@/features/user/infra/modules/customer.module';
import { CityModule } from '@/features/city/infra/modules/city.module';
import { IAdminUserCreateService } from '@/features/user/domain/services/admin-user-create.service';
import { AdminUserCreateService } from '@/features/user/application/services/admin-user-create.service';
import { ProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';
import { AdminUserListByUuidService } from '@/features/user/application/services/admin-user-list-by-uuid.service';
import { IAdminUserListByUuidService } from '@/features/user/domain/services/admin-user-list-by-uuid.service';

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

    AdminUserCreateService,
    {
      provide: IAdminUserCreateService,
      useClass: AdminUserCreateService,
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

    AdminUserListByUuidService,
    {
      provide: IAdminUserListByUuidService,
      useExisting: AdminUserListByUuidService,
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
    ProfileRepository,
    IUserListByEmailLoginUseCase,
  ],
})
export class UserModule {}
