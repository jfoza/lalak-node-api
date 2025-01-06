import { LoginService } from '@/features/auth/application/services/login.service';
import { AuthDto } from '@/features/auth/application/dto/auth.dto';
import { beforeEach, expect, vi } from 'vitest';
import { IUserListByEmailLoginUseCase } from '@/features/user/domain/use-cases/user-list-by-email-login.use-case.interface';
import { IAclRepository } from '@/acl/domain/repositories/acl.repository.interface';
import {
  IJwtToken,
  JwtAuthService,
} from '@/jwt/application/services/jwt-auth.service';
import { IAuthRepository } from '@/features/auth/domain/repositories/auth.repository.interface';
import { UserDataBuilder } from '../../../../../test/unit/user-data-builder';
import { UUID } from '@/utils/uuid';
import { LoginUserTypesEnum } from '@/utils/enums/login-user-types.enum';
import { UnauthorizedException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { Name } from '@/common/domain/value-objects/name';
import { Password } from '@/features/user/domain/value-objects/password';
import { ShortName } from '@/common/domain/value-objects/short-name';
import { BirthDate } from '@/common/domain/value-objects/birth-date';
import { Phone } from '@/common/domain/value-objects/phone';
import { ZipCode } from '@/common/domain/value-objects/zip-code';
import { Address } from '@/common/domain/value-objects/address';
import { Uf } from '@/common/domain/value-objects/uf';
import { BrazilianStates } from '@/utils/enums/brazilian-states.enum';
import { City, CityProps } from '@/features/city/domain/entities/city';
import {
  PersonAuthUser,
  PersonAuthUserProps,
} from '@/features/user/domain/entities/person-auth-user';

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
      findAllByUserUuid: vi.fn(() => []),
    } as unknown as IAclRepository;

    jwtAuthService = {
      sign: vi.fn(
        () =>
          ({
            token: UUID.generate(),
            type: 'JWT',
            expiration: 172800,
          }) as IJwtToken,
      ),
    } as unknown as JwtAuthService;

    authDto = new AuthDto();
    authDto.email = 'test@email.com';
    authDto.password = 'pass';

    sut = new LoginService(
      userListByEmailLoginUseCase,
      authRepository,
      abilityRepository,
      jwtAuthService,
    );
  });

  it('Should to create login user', async () => {
    const personAuthUser = await UserDataBuilder.getPersonAuthUser();

    authDto.email = personAuthUser.email;
    authDto.password = 'pass';

    vi.spyOn(userListByEmailLoginUseCase, 'execute').mockResolvedValue(
      personAuthUser,
    );

    const result = await sut.handle(authDto, LoginUserTypesEnum.ADMIN);

    expect(result).toMatchObject({
      token: expect.any(String),
      type: 'JWT',
      expiresIn: '2 days',
      user: {
        uuid: personAuthUser.uuid,
        email: personAuthUser.email,
        fullName: personAuthUser.name,
        shortName: personAuthUser.shortName,
        role: personAuthUser.profile.description,
        status: personAuthUser.active,
        ability: [],
      },
    });
  });

  it('Should return exception if user email not exists', async () => {
    vi.spyOn(userListByEmailLoginUseCase, 'execute').mockResolvedValue(null);

    await expect(sut.handle(authDto, LoginUserTypesEnum.ADMIN)).rejects.toThrow(
      UnauthorizedException,
    );
    await expect(sut.handle(authDto, LoginUserTypesEnum.ADMIN)).rejects.toThrow(
      ErrorMessagesEnum.UNAUTHORIZED_LOGIN,
    );
  });

  it('Should return exception if passwords not match', async () => {
    const personAuthUser = await UserDataBuilder.getPersonAuthUser();

    authDto.email = personAuthUser.email;
    authDto.password = 'password-not-match';

    vi.spyOn(userListByEmailLoginUseCase, 'execute').mockResolvedValue(
      personAuthUser,
    );

    await expect(sut.handle(authDto, LoginUserTypesEnum.ADMIN)).rejects.toThrow(
      UnauthorizedException,
    );
    await expect(sut.handle(authDto, LoginUserTypesEnum.ADMIN)).rejects.toThrow(
      ErrorMessagesEnum.UNAUTHORIZED_LOGIN,
    );
  });

  it('Should return exception if user is inactive', async () => {
    const personAuthUserProps: PersonAuthUserProps = {
      name: Name.createFrom('Test'),
      email: 'test@email.com',
      password: await Password.createFrom('pass'),
      shortName: ShortName.createFrom('Test'),
      birthDate: BirthDate.createFrom(new Date()),
      phone: Phone.createFrom('(51) 99999-9999'),
      zipCode: ZipCode.createFrom('99999-999'),
      address: Address.createFrom('test'),
      numberAddress: '00',
      complement: 'test',
      district: 'test',
      uf: Uf.create(BrazilianStates.RJ),
      active: false,
      createdAt: new Date(),
      city: new City({
        description: 'test',
        uf: Uf.create(BrazilianStates.RJ),
      } as CityProps),
      profile: UserDataBuilder.getAdminMasterProfile(),
      abilities: [],
    } as PersonAuthUserProps;

    const personAuthUser = PersonAuthUser.create(personAuthUserProps);

    authDto.email = personAuthUser.email;
    authDto.password = 'pass';

    vi.spyOn(userListByEmailLoginUseCase, 'execute').mockResolvedValue(
      personAuthUser,
    );

    await expect(sut.handle(authDto, LoginUserTypesEnum.ADMIN)).rejects.toThrow(
      UnauthorizedException,
    );
    await expect(sut.handle(authDto, LoginUserTypesEnum.ADMIN)).rejects.toThrow(
      ErrorMessagesEnum.INACTIVE_USER,
    );
  });
});
