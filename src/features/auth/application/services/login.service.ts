import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import moment from 'moment';
import { ILoginService } from '@/features/auth/domain/services/login.service.interface';
import { IAuthRepository } from '@/features/auth/domain/repositories/auth.repository.interface';
import { IAclRepository } from '@/acl/domain/repositories/acl.repository.interface';
import { IJwtToken } from '@/jwt/application/services/jwt-auth.service';
import { Hash } from '@/utils/hash';
import { AuthTypesEnum } from '@/utils/enums/auth-types.enum';
import { Auth, AuthProps } from '@/features/auth/domain/entities/auth';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { LoginUserTypesEnum } from '@/utils/enums/login-user-types.enum';
import { IAuthResponse } from '@/features/auth/domain/dto/auth.response.dto.interface';
import { IUserListByEmailLoginUseCase } from '@/features/user/domain/use-cases/user-list-by-email-login.use-case.interface';
import { Ability } from '@/acl/domain/entities/ability';
import { IAuthDto } from '@/features/auth/domain/dto/auth.dto.interface';
import { IJwtAuthService } from '@/jwt/domain/services/jwt-auth.service.interface';
import { Password } from '@/features/user/domain/value-objects/password';

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    @Inject(IUserListByEmailLoginUseCase)
    private readonly userListByEmailLoginUseCase: IUserListByEmailLoginUseCase,

    @Inject(IAuthRepository)
    private readonly authRepository: IAuthRepository,

    @Inject(IAclRepository)
    private readonly abilityRepository: IAclRepository,

    @Inject(IJwtAuthService)
    private readonly jwtAuthService: IJwtAuthService,
  ) {}

  async handle(
    authDto: IAuthDto,
    loginType: LoginUserTypesEnum,
  ): Promise<IAuthResponse> {
    const personAuthUser = await this.userListByEmailLoginUseCase.execute(
      authDto.email,
      loginType,
    );

    if (!personAuthUser) {
      throw new UnauthorizedException(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
    }

    const password: Password = personAuthUser.props.password;

    if (!(await Hash.compare(authDto.password, password.toValue()))) {
      throw new UnauthorizedException(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
    }

    if (!personAuthUser.active) {
      throw new UnauthorizedException(ErrorMessagesEnum.INACTIVE_USER);
    }

    const { uuid, name, shortName, email, profile, active } = personAuthUser;

    const payload = {
      sub: uuid,
      user: personAuthUser,
    };

    const authenticate: IJwtToken = this.jwtAuthService.sign(payload);

    const ability: Ability[] =
      await this.abilityRepository.findAllByUserUuid(uuid);

    const auth: Auth = await Auth.create({
      userUuid: uuid,
      initialDate: moment().toDate(),
      finalDate: moment().add(2, 'days').toDate(),
      token: authenticate.token,
      ipAddress: authDto.ipAddress,
      authType: AuthTypesEnum.EMAIL_PASSWORD,
      active: true,
    } as AuthProps);

    await this.authRepository.create(auth);

    return {
      token: authenticate.token,
      type: authenticate.type,
      expiresIn: `${authenticate.expiration / 86400} days`,
      user: {
        uuid: uuid,
        email: email,
        fullName: name,
        shortName,
        role: profile.description,
        status: active,
        ability,
      },
    };
  }
}
