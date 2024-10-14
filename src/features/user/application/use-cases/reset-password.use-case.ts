import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { IUserTokenRepository } from '@/features/user/domain/repositories/user-token.repository.interface';
import { UserValidations } from '@/features/user/application/validations/user.validations';
import { isAfter, addHours } from 'date-fns';
import { Hash } from '@/common/infra/utils/hash';
import { IResetPasswordUseCase } from '@/features/user/domain/use-cases/reset-password.use-case.interface';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

@Injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    @Inject('IUserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
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

    const newPasswordAux = await Hash.createHash(newPassword);

    await this.userRepository.updatePassword(user.uuid, newPasswordAux);
  }
}
