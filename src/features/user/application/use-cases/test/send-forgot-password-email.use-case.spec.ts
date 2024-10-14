import { SendForgotPasswordEmailUseCase } from '@/features/user/application/use-cases/send-forgot-password-email.use-case';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { IUserTokenRepository } from '@/features/user/domain/repositories/user-token.repository.interface';
import { vi } from 'vitest';
import { UserToken } from '@/features/user/domain/core/user-token';
import { Queue } from 'bull';
import { User } from '@/features/user/domain/core/user';
import { Person } from '@/features/user/domain/core/person';
import { v4 as uuid4 } from 'uuid';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

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
      create: vi.fn(async () => new UserToken()),
    } as unknown as IUserTokenRepository;

    sut = new SendForgotPasswordEmailUseCase(
      emailQueue,
      userRepository,
      userTokenRepository,
    );
  });

  it('should successfully send a forgot password email', async () => {
    const person = new Person('John Doe', 'JO');
    const user = new User(person.uuid, uuid4(), 'test@test.com');
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
