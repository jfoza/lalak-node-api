import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { IUserTokenRepository } from '@/features/user/domain/repositories/user-token.repository.interface';
import { vi } from 'vitest';
import { UserToken } from '@/features/user/domain/core/user-token';
import { User } from '@/features/user/domain/core/user';
import { Person } from '@/features/user/domain/core/person';
import { v4 as uuid4 } from 'uuid';
import { ResetPasswordUseCase } from '@/features/user/application/use-cases/reset-password.use-case';
import { addHours, subHours } from 'date-fns';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

describe('Send Forgot Password Email UseCase', () => {
  let sut: ResetPasswordUseCase;
  let userRepository: IUserRepository;
  let userTokenRepository: IUserTokenRepository;

  beforeEach(async () => {
    userRepository = {
      findByEmail: vi.fn(async () => null),
      updatePassword: vi.fn(),
    } as unknown as IUserRepository;

    userTokenRepository = {
      findByToken: vi.fn(async () => null),
    } as unknown as IUserTokenRepository;

    sut = new ResetPasswordUseCase(userRepository, userTokenRepository);
  });

  it('should reset user password', async () => {
    const person = new Person('John Doe', 'JO');
    const user = new User(person.uuid, uuid4(), 'test@test.com');
    user.person = person;

    const userToken = new UserToken(uuid4());
    userToken.createdAt = addHours(userToken.createdAt, 2);

    userTokenRepository.findByToken = vi.fn(async () => userToken);
    userRepository.findByUuid = vi.fn(async () => user);

    await sut.execute(uuid4(), 'new-password');

    expect(userRepository.updatePassword).toHaveBeenCalled();
  });

  it('should return exception if user token not exists', async () => {
    userTokenRepository.findByToken = vi.fn(async () => null);

    await expect(sut.execute(uuid4(), 'new-password')).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(uuid4(), 'new-password')).rejects.toThrow(
      ErrorMessagesEnum.USER_TOKEN_NOT_FOUND,
    );
  });

  it('should return exception if user is not found', async () => {
    const userToken = new UserToken(uuid4());

    userTokenRepository.findByToken = vi.fn(async () => userToken);
    userRepository.findByUuid = vi.fn(async () => null);

    await expect(sut.execute(uuid4(), 'new-password')).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(uuid4(), 'new-password')).rejects.toThrow(
      ErrorMessagesEnum.USER_NOT_FOUND,
    );
  });

  it('should return exception if user token is invalid', async () => {
    const person = new Person('John Doe', 'JO');
    const user = new User(person.uuid, uuid4(), 'test@test.com');
    user.person = person;

    const userToken = new UserToken(uuid4());
    userToken.createdAt = subHours(userToken.createdAt, 4);

    userTokenRepository.findByToken = vi.fn(async () => userToken);
    userRepository.findByUuid = vi.fn(async () => user);

    await expect(sut.execute(uuid4(), 'new-password')).rejects.toThrow(
      BadRequestException,
    );
    await expect(sut.execute(uuid4(), 'new-password')).rejects.toThrow(
      ErrorMessagesEnum.INVALID_USER_TOKEN,
    );
  });
});
