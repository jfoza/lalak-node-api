import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userProvider } from '@/features/user/infra/providers/user.provider';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';
import { PersonEntity } from '@/features/user/infra/database/typeorm/entities/person.entity';
import { ProfileEntity } from '@/features/user/infra/database/typeorm/entities/profile.entity';
import { AdminUserEntity } from '@/features/user/infra/database/typeorm/entities/admin-user.entity';
import { AdminUserController } from '@/features/user/presentation/controllers/admin-user.controller';
import { UserTokenEntity } from '@/features/user/infra/database/typeorm/entities/user-token.entity';
import { ForgotPasswordController } from '@/features/user/presentation/controllers/forgot-password.controller';
import { MailModule } from '@/mail/infra/modules/mail.module';
import { AmqpModule } from '@/amqp/infra/modules/amqp.module';
import { SendForgotPasswordEmailJob } from '@/features/user/application/jobs/send-forgot-password-email.job';

@Global()
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
  ],
  controllers: [AdminUserController, ForgotPasswordController],
  providers: [...userProvider.register(), SendForgotPasswordEmailJob],
  exports: [...userProvider.exports(), SendForgotPasswordEmailJob],
})
export class UserModule {}
