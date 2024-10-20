import { ConflictException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { User } from '@/features/user/domain/core/user';
import { IUserTokenRepository } from '@/features/user/domain/repositories/user-token.repository.interface';
import { UserToken } from '@/features/user/domain/core/user-token';

export class UserValidations {
  static async userExistsByUuid(
    uuid: string,
    userRepository: IUserRepository,
  ): Promise<User> {
    const user = await userRepository.findByUuid(uuid);

    if (!user) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return user;
  }

  static async userExistsByEmail(
    email: string,
    userRepository: IUserRepository,
  ): Promise<User> {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return user;
  }

  static async userAlreadyExistsByEmail(
    email: string,
    userRepository: IUserRepository,
  ): Promise<void> {
    if (await userRepository.findByEmail(email)) {
      throw new ConflictException(ErrorMessagesEnum.EMAIL_ALREADY_EXISTS);
    }
  }

  static async userAlreadyExistsByEmailInUpdate(
    uuid: string,
    email: string,
    userRepository: IUserRepository,
  ): Promise<void> {
    const user = await userRepository.findByEmail(email);

    if (user && user.uuid !== uuid) {
      throw new ConflictException(ErrorMessagesEnum.EMAIL_ALREADY_EXISTS);
    }
  }

  static async userTokenExists(
    token: string,
    userTokenRepository: IUserTokenRepository,
  ): Promise<UserToken> {
    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new NotFoundException(ErrorMessagesEnum.USER_TOKEN_NOT_FOUND);
    }

    return userToken;
  }
}
