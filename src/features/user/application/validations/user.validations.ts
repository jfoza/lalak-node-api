import { ConflictException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { UserToken } from '@/features/user/domain/entities/user-token';
import { UserRepository } from '@/features/user/domain/repositories/user-repository';
import { UserTokenRepository } from '@/features/user/domain/repositories/user-token.repository';
import { User } from '@/features/user/domain/entities/user';

export class UserValidations {
  static async userExistsByUuid(
    uuid: string,
    userRepository: UserRepository,
  ): Promise<User> {
    const user = await userRepository.findUserByUuid(uuid);

    if (!user) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return user;
  }

  static async userExistsByEmail(
    email: string,
    userRepository: UserRepository,
  ): Promise<User> {
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return user;
  }

  static async userAlreadyExistsByEmail(
    email: string,
    userRepository: UserRepository,
  ): Promise<void> {
    if (await userRepository.findUserByEmail(email)) {
      throw new ConflictException(ErrorMessagesEnum.EMAIL_ALREADY_EXISTS);
    }
  }

  static async userAlreadyExistsByEmailInUpdate(
    uuid: string,
    email: string,
    userRepository: UserRepository,
  ): Promise<void> {
    const user = await userRepository.findUserByEmail(email);

    if (user && user.uuid !== uuid) {
      throw new ConflictException(ErrorMessagesEnum.EMAIL_ALREADY_EXISTS);
    }
  }

  static async userTokenExists(
    token: string,
    userTokenRepository: UserTokenRepository,
  ): Promise<UserToken> {
    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new NotFoundException(ErrorMessagesEnum.USER_TOKEN_NOT_FOUND);
    }

    return userToken;
  }
}
