import { SendForgotPasswordEmailUseCase } from '@/features/user/application/use-cases/send-forgot-password-email.use-case';
import { IUserTokenRepository } from '@/features/user/domain/repositories/user-token.repository.interface';
import { vi } from 'vitest';
import {
  UserToken,
  UserTokenProps,
} from '@/features/user/domain/entities/user-token';
import { Queue } from 'bull';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { UserRepository } from '@/features/user/domain/repositories/user-repository';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

describe('Send Forgot Password Email UseCase', () => {
  let sut: SendForgotPasswordEmailUseCase;
  let emailQueue: Queue;
  let personUserRepository: UserRepository;
  let userTokenRepository: IUserTokenRepository;

  beforeEach(async () => {
    emailQueue = {
      add: vi.fn(async () => null),
    } as unknown as Queue;

    personUserRepository = {
      findByEmail: vi.fn(async () => null),
    } as unknown as UserRepository;

    userTokenRepository = {
      create: vi.fn(
        async () =>
          new UserToken({
            userUuid: UniqueEntityId.create(),
            token: UniqueEntityId.create(),
          } as UserTokenProps),
      ),
    } as unknown as IUserTokenRepository;

    sut = new SendForgotPasswordEmailUseCase(
      emailQueue,
      personUserRepository,
      userTokenRepository,
    );
  });

  it('should successfully send a forgot password email', async () => {
    const person = await UserDataBuilder.getPerson();

    personUserRepository.findByEmail = vi.fn(async () => person);

    await sut.execute('test@email.com');

    expect(userTokenRepository.create).toHaveBeenCalled();
  });

  it('should return exception if user is not found', async () => {
    personUserRepository.findByEmail = vi.fn(async () => null);

    await expect(sut.execute('test@email.com')).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute('test@email.com')).rejects.toThrow(
      ErrorMessagesEnum.USER_NOT_FOUND,
    );
  });
});
