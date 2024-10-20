import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { IUserTokenRepository } from '@/features/user/domain/repositories/user-token.repository.interface';
import { vi } from 'vitest';
import {
  UserToken,
  UserTokenProps,
} from '@/features/user/domain/core/user-token';
import { User, UserProps } from '@/features/user/domain/core/user';
import { ResetPasswordUseCase } from '@/features/user/application/use-cases/reset-password.use-case';
import { addHours, subHours } from 'date-fns';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { UUID } from '@/common/infra/utils/uuid';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';
import { Profile } from '@/features/user/domain/core/profile';
import { ProfileUniqueNameEnum } from '@/common/infra/enums/profile-unique-name.enum';

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
    const person = UserDataBuilder.getPerson();
    const userProfile = new Profile({
      description: 'Admin Master',
      uniqueName: ProfileUniqueNameEnum.ADMIN_MASTER,
    });
    const user = new User({
      personUuid: person.uuid,
      profileUuid: userProfile.uuid,
      email: 'test@test.com',
      password: 'pass',
      active: true,
      person,
      profile: userProfile,
    } as UserProps);
    user.person = person;

    const userToken = new UserToken({
      userUuid: user.uuid,
      token: UUID.generate(),
    } as UserTokenProps);

    userToken.props.createdAt = addHours(userToken.createdAt, 2);

    userTokenRepository.findByToken = vi.fn(async () => userToken);
    userRepository.findByUuid = vi.fn(async () => user);

    await sut.execute(UUID.generate(), 'new-password');

    expect(userRepository.updatePassword).toHaveBeenCalled();
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
    const userToken = new UserToken({
      userUuid: UUID.generate(),
      token: UUID.generate(),
    } as UserTokenProps);

    userTokenRepository.findByToken = vi.fn(async () => userToken);
    userRepository.findByUuid = vi.fn(async () => null);

    await expect(sut.execute(UUID.generate(), 'new-password')).rejects.toThrow(
      NotFoundException,
    );
    await expect(sut.execute(UUID.generate(), 'new-password')).rejects.toThrow(
      ErrorMessagesEnum.USER_NOT_FOUND,
    );
  });

  it('should return exception if user token is invalid', async () => {
    const person = UserDataBuilder.getPerson();
    const userProfile = new Profile({
      description: 'Admin Master',
      uniqueName: ProfileUniqueNameEnum.ADMIN_MASTER,
    });
    const user = new User({
      personUuid: person.uuid,
      profileUuid: userProfile.uuid,
      email: 'test@test.com',
      password: 'pass',
      active: true,
      person,
      profile: userProfile,
    } as UserProps);
    user.person = person;

    const userToken = new UserToken({
      userUuid: user.uuid,
      token: UUID.generate(),
    } as UserTokenProps);

    userToken.props.createdAt = subHours(userToken.createdAt, 4);

    userTokenRepository.findByToken = vi.fn(async () => userToken);
    userRepository.findByUuid = vi.fn(async () => user);

    await expect(sut.execute(UUID.generate(), 'new-password')).rejects.toThrow(
      BadRequestException,
    );
    await expect(sut.execute(UUID.generate(), 'new-password')).rejects.toThrow(
      ErrorMessagesEnum.INVALID_USER_TOKEN,
    );
  });
});
