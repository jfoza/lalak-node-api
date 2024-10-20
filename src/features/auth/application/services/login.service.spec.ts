import { LoginService } from '@/features/auth/application/services/login.service';
import { AuthDto } from '@/features/auth/application/dto/auth.dto';
import { beforeEach, expect, vi } from 'vitest';
import { IUserListByEmailLoginUseCase } from '@/features/user/domain/use-cases/user-list-by-email-login.use-case.interface';
import { IAclRepository } from '@/acl/domain/interfaces/acl.repository.interface';
import { JwtAuthService } from '@/jwt/application/services/jwt-auth.service';
import { IJwtToken } from '@/jwt/domain/interfaces/jwt-token.interface';
import { IAuthRepository } from '@/features/auth/domain/interfaces/auth.repository.interface';
import { UserDataBuilder } from '../../../../../test/unit/user-data-builder';
import { UUID } from '@/common/infra/utils/uuid';
import { Hash } from '@/common/infra/utils/hash';
import { User } from '@/features/user/domain/core/user';
import { LoginUserTypesEnum } from '@/common/infra/enums/login-user-types.enum';
import { UnauthorizedException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

describe('LoginService Unit Tests', () => {
  let sut: LoginService;
  let authDto: AuthDto;

  let userListByEmailLoginUseCase: IUserListByEmailLoginUseCase;
  let authRepository: IAuthRepository;
  let abilityRepository: IAclRepository;
  let jwtAuthService: JwtAuthService;

  beforeEach(() => {
    userListByEmailLoginUseCase = {
      execute: vi.fn(() => null),
    } as unknown as IUserListByEmailLoginUseCase;

    authRepository = {
      create: vi.fn(),
    } as unknown as IAuthRepository;

    abilityRepository = {
      findAllByUserId: vi.fn(() => []),
    } as unknown as IAclRepository;

    jwtAuthService = {
      authenticate: vi.fn(
        () =>
          ({
            token: UUID.generate(),
            type: 'JWT',
            expiration: 172800,
          }) as IJwtToken,
      ),
    } as unknown as JwtAuthService;

    authDto = new AuthDto();

    sut = new LoginService(
      userListByEmailLoginUseCase,
      authRepository,
      abilityRepository,
      jwtAuthService,
    );
  });

  it('Should to create login user', async () => {
    authDto.email = 'test@email.com';
    authDto.password = 'pass';

    const userProps = {
      personUuid: UUID.generate(),
      profileUuid: UUID.generate(),
      email: 'test@email.com',
      password: await Hash.createHash('pass'),
      active: true,
      createdAt: new Date(),
      profile: UserDataBuilder.getAdminMasterProfile(),
      person: UserDataBuilder.getPerson(),
    };

    const user = new User(userProps);

    userListByEmailLoginUseCase.execute = vi.fn(async () => user);

    const result = await sut.handle(authDto, LoginUserTypesEnum.ADMIN);

    expect(jwtAuthService.authenticate).toHaveBeenCalledWith({
      sub: user.uuid,
      user: {
        uuid: user.uuid,
        profileUuid: user.profileUuid,
        email: user.email,
        active: user.active,
      },
    });

    expect(authRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        userUuid: user.uuid,
        ipAddress: authDto.ipAddress,
        authType: 'EMAIL_PASSWORD',
        active: true,
      }),
    );

    expect(result).toEqual({
      token: expect.any(String),
      type: 'JWT',
      expiresIn: '2 days',
      user: {
        uuid: user.uuid,
        email: user.email,
        fullName: user.person.name,
        shortName: user.person.shortName,
        role: user.profile.description,
        status: user.active,
        ability: [],
      },
    });
  });

  it('Should return exception if passwords not match', async () => {
    authDto.email = 'test@email.com';
    authDto.password = 'pass';

    const userProps = {
      personUuid: UUID.generate(),
      profileUuid: UUID.generate(),
      email: 'test@email.com',
      password: await Hash.createHash('pass2'),
      active: true,
      createdAt: new Date(),
      profile: UserDataBuilder.getAdminMasterProfile(),
      person: UserDataBuilder.getPerson(),
    };

    const user = new User(userProps);

    userListByEmailLoginUseCase.execute = vi.fn(async () => user);

    await expect(sut.handle(authDto, LoginUserTypesEnum.ADMIN)).rejects.toThrow(
      UnauthorizedException,
    );
    await expect(sut.handle(authDto, LoginUserTypesEnum.ADMIN)).rejects.toThrow(
      ErrorMessagesEnum.UNAUTHORIZED_LOGIN,
    );
  });

  it('Should return exception if user is inactive', async () => {
    authDto.email = 'test@email.com';
    authDto.password = 'pass';

    const userProps = {
      personUuid: UUID.generate(),
      profileUuid: UUID.generate(),
      email: 'test@email.com',
      password: await Hash.createHash('pass'),
      active: false,
      createdAt: new Date(),
      profile: UserDataBuilder.getAdminMasterProfile(),
      person: UserDataBuilder.getPerson(),
    };

    const user = new User(userProps);

    userListByEmailLoginUseCase.execute = vi.fn(async () => user);

    await expect(sut.handle(authDto, LoginUserTypesEnum.ADMIN)).rejects.toThrow(
      UnauthorizedException,
    );
    await expect(sut.handle(authDto, LoginUserTypesEnum.ADMIN)).rejects.toThrow(
      ErrorMessagesEnum.INACTIVE_USER,
    );
  });
});
