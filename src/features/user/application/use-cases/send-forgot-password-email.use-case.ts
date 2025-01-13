import { ISendForgotPasswordEmailUseCase } from '@/features/user/domain/use-cases/send-forgot-password-email.use-case.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UserValidations } from '@/features/user/application/validations/user.validations';
import {
  UserToken,
  UserTokenProps,
} from '@/features/user/domain/entities/user-token';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { TokenTypesEnum } from '@/utils/enums/token-types.enum';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { UserTokenType } from '@/features/user/domain/value-objects/user-token-type';
import { UserRepository } from '@/features/user/domain/repositories/user-repository';
import { UserTokenRepository } from '@/features/user/domain/repositories/user-token.repository';

@Injectable()
export class SendForgotPasswordEmailUseCase
  implements ISendForgotPasswordEmailUseCase
{
  constructor(
    @InjectQueue('email')
    private readonly emailQueue: Queue,

    @Inject(UserRepository)
    private readonly userRepository: UserRepository,

    @Inject(UserTokenRepository)
    private readonly userTokenRepository: UserTokenRepository,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await UserValidations.userExistsByEmail(
      email,
      this.userRepository,
    );

    const userToken = UserToken.create({
      userUuid: UniqueEntityId.create(user.uuid),
      token: UniqueEntityId.create(),
      tokenType: UserTokenType.create(TokenTypesEnum.FORGOT_PASSWORD),
    } as UserTokenProps);

    await this.userTokenRepository.create(userToken);

    await this.emailQueue.add('sendForgotPasswordEmail', {
      email: user.email,
      name: '',
      token: userToken.token,
    });
  }
}
