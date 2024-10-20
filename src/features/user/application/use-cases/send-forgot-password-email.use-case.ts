import { ISendForgotPasswordEmailUseCase } from '@/features/user/domain/use-cases/send-forgot-password-email.use-case.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IUserTokenRepository } from '@/features/user/domain/repositories/user-token.repository.interface';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { UserValidations } from '@/features/user/application/validations/user.validations';
import {
  UserToken,
  UserTokenProps,
} from '@/features/user/domain/core/user-token';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { TokenTypesEnum } from '@/common/infra/enums/token-types.enum';
import { UUID } from '@/common/infra/utils/uuid';

@Injectable()
export class SendForgotPasswordEmailUseCase
  implements ISendForgotPasswordEmailUseCase
{
  constructor(
    @InjectQueue('email')
    private readonly emailQueue: Queue,

    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    @Inject('IUserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await UserValidations.userExistsByEmail(
      email,
      this.userRepository,
    );

    const userToken = await UserToken.createAndValidate({
      userUuid: user.uuid,
      token: UUID.generate(),
      tokenType: TokenTypesEnum.FORGOT_PASSWORD,
    } as UserTokenProps);

    await this.userTokenRepository.create(userToken);

    await this.emailQueue.add('sendForgotPasswordEmail', {
      email: user.email,
      name: user.person.name,
      token: userToken.token,
    });
  }
}
