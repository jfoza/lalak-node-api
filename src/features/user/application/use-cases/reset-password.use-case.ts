import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserValidations } from '@/features/user/application/validations/user.validations';
import { isAfter, addHours } from 'date-fns';
import { Hash } from '@/utils/hash';
import { IResetPasswordUseCase } from '@/features/user/domain/use-cases/reset-password.use-case.interface';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { UserRepository } from '@/features/user/domain/repositories/user-repository';
import { UserTokenRepository } from '@/features/user/domain/repositories/user-token.repository';

@Injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,

    @Inject(UserTokenRepository)
    private readonly userTokenRepository: UserTokenRepository,
  ) {}

  async execute(token: string, newPassword: string): Promise<void> {
    const userToken = await UserValidations.userTokenExists(
      token,
      this.userTokenRepository,
    );

    const user = await UserValidations.userExistsByUuid(
      userToken.userUuid,
      this.userRepository,
    );

    const compareDate = addHours(userToken.createdAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new BadRequestException(ErrorMessagesEnum.INVALID_USER_TOKEN);
    }

    const newPasswordAux = await Hash.create(newPassword);

    await this.userRepository.updateUserPassword(user.uuid, newPasswordAux);
  }
}
