import { IUserTokenRepository } from '@/features/user/domain/repositories/user-token.repository.interface';
import { vi } from 'vitest';
import {
  UserToken,
  UserTokenProps,
} from '@/features/user/domain/entities/user-token';
import { ResetPasswordUseCase } from '@/features/user/application/use-cases/reset-password.use-case';
import { addHours, subHours } from 'date-fns';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { UUID } from '@/utils/uuid';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { UserRepository } from '@/features/user/domain/repositories/user-repository';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

describe('Send Forgot Password Email UseCase', () => {
  let sut: ResetPasswordUseCase;
  let personUserRepository: UserRepository;
  let userTokenRepository: IUserTokenRepository;

  beforeEach(async () => {
    personUserRepository = {
      findByEmail: vi.fn(async () => null),
      updatePassword: vi.fn(),
    } as unknown as UserRepository;

    userTokenRepository = {
      findByToken: vi.fn(async () => null),
    } as unknown as IUserTokenRepository;

    sut = new ResetPasswordUseCase(personUserRepository, userTokenRepository);
  });

  it('should reset user password', async () => {
    const person = await UserDataBuilder.getPerson();

    const { user } = person;

    const userToken = new UserToken({
      userUuid: UniqueEntityId.create(user.uuid),
      token: UniqueEntityId.create(),
    } as UserTokenProps);

    userToken.props.createdAt = addHours(userToken.createdAt, 2);

    userTokenRepository.findByToken = vi.fn(async () => userToken);
    personUserRepository.findByUuid = vi.fn(async () => person);

    await sut.execute(UUID.generate(), 'new-password');

    expect(personUserRepository.updatePassword).toHaveBeenCalled();
  });

  it('should return exception if user token not exists', async () => {
    userTokenRepository.findByToken = vi.fn(async () => null);

    await expect(sut.execute(UUID.generate(), 'new-password')).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(UUID.generate(), 'new-password')).rejects.toThrow(
      ErrorMessagesEnum.USER_TOKEN_NOT_FOUND,
    );
  });

  it('should return exception if user is not found', async () => {
    const person = await UserDataBuilder.getPerson();

    const { user } = person;

    const userToken = new UserToken({
      userUuid: UniqueEntityId.create(user.uuid),
      token: UniqueEntityId.create(),
    } as UserTokenProps);

    userTokenRepository.findByToken = vi.fn(async () => userToken);
    personUserRepository.findByUuid = vi.fn(async () => null);

    await expect(sut.execute(UUID.generate(), 'new-password')).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(UUID.generate(), 'new-password')).rejects.toThrow(
      ErrorMessagesEnum.USER_NOT_FOUND,
    );
  });

  it('should return exception if user token is invalid', async () => {
    const person = await UserDataBuilder.getPerson();

    const { user } = person;

    const userToken = new UserToken({
      userUuid: UniqueEntityId.create(user.uuid),
      token: UniqueEntityId.create(),
    } as UserTokenProps);

    userToken.props.createdAt = subHours(userToken.createdAt, 4);

    userTokenRepository.findByToken = vi.fn(async () => userToken);
    personUserRepository.findByUuid = vi.fn(async () => person);

    await expect(sut.execute(UUID.generate(), 'new-password')).rejects.toThrow(
      BadRequestException,
    );
    await expect(sut.execute(UUID.generate(), 'new-password')).rejects.toThrow(
      ErrorMessagesEnum.INVALID_USER_TOKEN,
    );
  });
});
