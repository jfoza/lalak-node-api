import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserTokenRepository } from '@/features/user/domain/repositories/user-token.repository.interface';
import { UserValidations } from '@/features/user/application/validations/user.validations';
import { isAfter, addHours } from 'date-fns';
import { Hash } from '@/utils/hash';
import { IResetPasswordUseCase } from '@/features/user/domain/use-cases/reset-password.use-case.interface';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { PersonUserRepository } from '@/features/user/domain/repositories/person-user-repository';

@Injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    @Inject(PersonUserRepository)
    private readonly personUserRepository: PersonUserRepository,

    @Inject(IUserTokenRepository)
    private readonly userTokenRepository: IUserTokenRepository,
  ) {}

  async execute(token: string, newPassword: string): Promise<void> {
    const userToken = await UserValidations.userTokenExists(
      token,
      this.userTokenRepository,
    );

    const user = await UserValidations.userExistsByUuid(
      userToken.userUuid,
      this.personUserRepository,
    );

    const compareDate = addHours(userToken.createdAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new BadRequestException(ErrorMessagesEnum.INVALID_USER_TOKEN);
    }

    const newPasswordAux = await Hash.create(newPassword);

    await this.personUserRepository.updatePassword(user.uuid, newPasswordAux);
  }
}
