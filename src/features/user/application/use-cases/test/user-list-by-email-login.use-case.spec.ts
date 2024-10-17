import { vi } from 'vitest';
import { User } from '@/features/user/domain/core/user';
import { UserListByEmailLoginUseCase } from '@/features/user/application/use-cases/user-list-by-email-login.use-case';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { LoginUserTypesEnum } from '@/common/infra/enums/login-user-types.enum';
import { UnauthorizedException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { UserDataBuilder } from '../../../../../../test/unit/user-data-builder';

describe('Admin User List By Id UseCase', () => {
  let sut: UserListByEmailLoginUseCase;
  const userRepository = {
    findByEmailInLogin: vi.fn(async () => null),
  } as unknown as IUserRepository;

  beforeEach(() => {
    sut = new UserListByEmailLoginUseCase(userRepository);
  });

  it.each([
    {
      loginType: LoginUserTypesEnum.ADMIN,
    },
    {
      loginType: LoginUserTypesEnum.CUSTOMER,
    },
  ])(
    'should to list user by email for authentication process',
    async ({ loginType }) => {
      const user = await UserDataBuilder.getUserAdminType();
      user.props.adminUser = UserDataBuilder.getAdminUser();
      user.props.customer = UserDataBuilder.getCustomer();

      userRepository.findByEmailInLogin = vi.fn(async () => user);

      const result = await sut.execute('john-doe@email.com', loginType);

      expect(userRepository.findByEmailInLogin).toHaveBeenCalled();
      expect(result).toBeInstanceOf(User);
    },
  );

  it('should return exception if admin relation not exists', async () => {
    const user = await UserDataBuilder.getUserAdminType();
    user.props.adminUser = null;

    userRepository.findByEmailInLogin = vi.fn(async () => user);

    await expect(
      sut.execute('john-doe@email.com', LoginUserTypesEnum.ADMIN),
    ).rejects.toThrow(UnauthorizedException);
    await expect(
      sut.execute('john-doe@email.com', LoginUserTypesEnum.ADMIN),
    ).rejects.toThrow(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
  });

  it('should return exception if customer relation not exists', async () => {
    const user = await UserDataBuilder.getUserAdminType();

    userRepository.findByEmailInLogin = vi.fn(async () => user);

    await expect(
      sut.execute('john-doe@email.com', LoginUserTypesEnum.CUSTOMER),
    ).rejects.toThrow(UnauthorizedException);
    await expect(
      sut.execute('john-doe@email.com', LoginUserTypesEnum.CUSTOMER),
    ).rejects.toThrow(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
  });
});
