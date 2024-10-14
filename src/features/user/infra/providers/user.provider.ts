import { Provider } from '@nestjs/common';
import { ProvidersType } from '@/common/infra/providers/provider.type';
import { TypeormUserRepository } from '@/features/user/infra/database/typeorm/repositories/typeorm-user.repository';
import { UserListByEmailLoginUseCase } from '@/features/user/application/use-cases/user-list-by-email-login.use-case';
import { TypeormAdminUserRepository } from '@/features/user/infra/database/typeorm/repositories/typeorm-admin-user-reporitory';
import { AdminUserListUseCase } from '@/features/user/application/use-cases/admin-user-list.use-case';
import { AdminUserListByIdUseCase } from '@/features/user/application/use-cases/admin-user-list-by-id.use-case';
import { TypeormPersonRepository } from '@/features/user/infra/database/typeorm/repositories/typeorm-person-repository';
import { TypeormProfileRepository } from '@/features/user/infra/database/typeorm/repositories/typeorm-profile.repository';
import { AdminUserCreateUseCase } from '@/features/user/application/use-cases/admin-user-create.use-case';
import { AdminUserUpdateUseCase } from '@/features/user/application/use-cases/admin-user-update.use-case';
import { TypeormUserTokenRepository } from '@/features/user/infra/database/typeorm/repositories/typeorm-user-token.repository';
import { SendForgotPasswordEmailUseCase } from '@/features/user/application/use-cases/send-forgot-password-email.use-case';
import { ResetPasswordUseCase } from '@/features/user/application/use-cases/reset-password.use-case';
import { AdminUserMapper } from '@/features/user/infra/database/typeorm/mappers/admin-user.mapper';
import { PersonMapper } from '@/features/user/infra/database/typeorm/mappers/person.mapper';
import { ProfileMapper } from '@/features/user/infra/database/typeorm/mappers/profile.mapper';
import { UserMapper } from '@/features/user/infra/database/typeorm/mappers/user.mapper';
import { UserTokenMapper } from '@/features/user/infra/database/typeorm/mappers/user-token.mapper';

export const userProvider: ProvidersType = {
  repositoryProviders: [
    TypeormUserRepository,
    {
      provide: 'IUserRepository',
      useExisting: TypeormUserRepository,
    },

    TypeormAdminUserRepository,
    {
      provide: 'IAdminUserRepository',
      useExisting: TypeormAdminUserRepository,
    },

    TypeormPersonRepository,
    {
      provide: 'IPersonRepository',
      useExisting: TypeormPersonRepository,
    },

    TypeormProfileRepository,
    {
      provide: 'IProfileRepository',
      useExisting: TypeormProfileRepository,
    },

    TypeormUserTokenRepository,
    {
      provide: 'IUserTokenRepository',
      useExisting: TypeormUserTokenRepository,
    },
  ],

  serviceProviders: [],

  useCaseProviders: [
    UserListByEmailLoginUseCase,
    {
      provide: 'IUserListByEmailLoginUseCase',
      useExisting: UserListByEmailLoginUseCase,
    },

    AdminUserListUseCase,
    {
      provide: 'IAdminUserListUseCase',
      useExisting: AdminUserListUseCase,
    },

    AdminUserListByIdUseCase,
    {
      provide: 'IAdminUserListById',
      useExisting: AdminUserListByIdUseCase,
    },

    AdminUserCreateUseCase,
    {
      provide: 'IAdminUserCreateUseCase',
      useExisting: AdminUserCreateUseCase,
    },

    AdminUserUpdateUseCase,
    {
      provide: 'IAdminUserUpdateUseCase',
      useExisting: AdminUserUpdateUseCase,
    },

    SendForgotPasswordEmailUseCase,
    {
      provide: 'ISendForgotPasswordEmailUseCase',
      useExisting: SendForgotPasswordEmailUseCase,
    },

    ResetPasswordUseCase,
    {
      provide: 'IResetPasswordUseCase',
      useExisting: ResetPasswordUseCase,
    },
  ],

  mappersProviders: [
    AdminUserMapper,
    PersonMapper,
    ProfileMapper,
    UserMapper,
    UserTokenMapper,
  ],

  register(): Provider[] {
    return [
      ...this.repositoryProviders,
      ...this.serviceProviders,
      ...this.useCaseProviders,
      ...this.mappersProviders,
    ];
  },

  exports(): any[] {
    return [
      'IPersonRepository',
      'IUserRepository',
      'IProfileRepository',
      'IUserListByEmailLoginUseCase',
      UserMapper,
    ];
  },
};
