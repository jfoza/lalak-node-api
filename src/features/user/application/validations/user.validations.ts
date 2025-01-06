import { ConflictException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { IUserTokenRepository } from '@/features/user/domain/repositories/user-token.repository.interface';
import { UserToken } from '@/features/user/domain/entities/user-token';
import { PersonUserRepository } from '@/features/user/domain/repositories/person-user-repository';
import { Person } from '@/features/user/domain/entities/person';

export class UserValidations {
  static async userExistsByUuid(
    uuid: string,
    personUserRepository: PersonUserRepository,
  ): Promise<Person> {
    const user = await personUserRepository.findByUuid(uuid);

    if (!user) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return user;
  }

  static async userExistsByEmail(
    email: string,
    personUserRepository: PersonUserRepository,
  ): Promise<Person> {
    const user = await personUserRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return user;
  }

  static async userAlreadyExistsByEmail(
    email: string,
    personUserRepository: PersonUserRepository,
  ): Promise<void> {
    if (await personUserRepository.findByEmail(email)) {
      throw new ConflictException(ErrorMessagesEnum.EMAIL_ALREADY_EXISTS);
    }
  }

  static async userAlreadyExistsByEmailInUpdate(
    uuid: string,
    email: string,
    personUserRepository: PersonUserRepository,
  ): Promise<void> {
    const user = await personUserRepository.findByEmail(email);

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
