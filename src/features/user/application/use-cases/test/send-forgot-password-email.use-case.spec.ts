import { SendForgotPasswordEmailUseCase } from '@/features/user/application/use-cases/send-forgot-password-email.use-case';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { IUserTokenRepository } from '@/features/user/domain/repositories/user-token.repository.interface';
import { vi } from 'vitest';
import {
  UserToken,
  UserTokenProps,
} from '@/features/user/domain/core/user-token';
import { Queue } from 'bull';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { UUID } from '@/common/infra/utils/uuid';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';

describe('Send Forgot Password Email UseCase', () => {
  let sut: SendForgotPasswordEmailUseCase;
  let emailQueue: Queue;
  let userRepository: IUserRepository;
  let userTokenRepository: IUserTokenRepository;

  beforeEach(async () => {
    emailQueue = {
      add: vi.fn(async () => null),
    } as unknown as Queue;

    userRepository = {
      findByEmail: vi.fn(async () => null),
    } as unknown as IUserRepository;

    userTokenRepository = {
      create: vi.fn(
        async () =>
          new UserToken({
            userUuid: UUID.generate(),
            token: UUID.generate(),
          } as UserTokenProps),
      ),
    } as unknown as IUserTokenRepository;

    sut = new SendForgotPasswordEmailUseCase(
      emailQueue,
      userRepository,
      userTokenRepository,
    );
  });

  it('should successfully send a forgot password email', async () => {
    const person = UserDataBuilder.getPerson();
    const user = await UserDataBuilder.getUserAdminType();
    user.person = person;

    userRepository.findByEmail = vi.fn(async () => user);

    await sut.execute('test@email.com');

    expect(userTokenRepository.create).toHaveBeenCalled();
  });

  it('should return exception if user is not found', async () => {
    userRepository.findByEmail = vi.fn(async () => null);

    await expect(sut.execute('test@email.com')).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute('test@email.com')).rejects.toThrow(
      ErrorMessagesEnum.USER_NOT_FOUND,
    );
  });
});
