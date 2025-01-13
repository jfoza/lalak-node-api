import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import moment from 'moment';
import {
  IJwtTokenAuthUser,
  ILoginService,
  IPayload,
} from '@/features/auth/domain/services/login.service.interface';
import { IAuthRepository } from '@/features/auth/domain/repositories/auth.repository.interface';
import { IAclRepository } from '@/acl/domain/repositories/acl.repository.interface';
import { Hash } from '@/utils/hash';
import { AuthTypesEnum } from '@/utils/enums/auth-types.enum';
import { Auth, AuthProps } from '@/features/auth/domain/entities/auth';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { LoginUserTypesEnum } from '@/utils/enums/login-user-types.enum';
import { IUserListByEmailLoginUseCase } from '@/features/user/domain/use-cases/user-list-by-email-login.use-case.interface';
import { IAuthDto } from '@/features/auth/domain/dto/auth.dto.interface';
import {
  IJwtAuthService,
  IJwtToken,
} from '@/jwt/domain/services/jwt-auth.service.interface';
import { Ability } from '@/acl/domain/entities/ability';

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
  ): Promise<IJwtTokenAuthUser> {
    const user = await this.userListByEmailLoginUseCase.execute(
      authDto.email,
      loginType,
    );

    if (!user) {
      throw new UnauthorizedException(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
    }

    if (!(await Hash.compare(authDto.password, user.password))) {
      throw new UnauthorizedException(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
    }

    if (!user.active) {
      throw new UnauthorizedException(ErrorMessagesEnum.INACTIVE_USER);
    }

    const { userUuid } = user;

    const payload: IPayload = {
      sub: userUuid,
      user,
    };

    const jwtToken: IJwtToken = this.jwtAuthService.sign(payload);

    const abilities: Ability[] =
      await this.abilityRepository.findAllByUserUuid(userUuid);

    const auth: Auth = await Auth.create({
      userUuid: userUuid,
      initialDate: moment().toDate(),
      finalDate: moment().add(2, 'days').toDate(),
      token: jwtToken.token,
      ipAddress: authDto.ipAddress,
      authType: AuthTypesEnum.EMAIL_PASSWORD,
      active: true,
    } as AuthProps);

    await this.authRepository.create(auth);

    return {
      jwtToken,
      user,
      abilities,
    };
  }
}
