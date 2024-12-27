import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import moment from 'moment';
import { ILoginService } from '@/features/auth/domain/services/login.service.interface';
import { IAuthRepository } from '@/features/auth/domain/repositories/auth.repository.interface';
import { IAclRepository } from '@/acl/domain/repositories/acl.repository.interface';
import {
  IJwtToken,
  JwtAuthService,
} from '@/jwt/application/services/jwt-auth.service';
import { Hash } from '@/utils/hash';
import { AuthTypesEnum } from '@/utils/enums/auth-types.enum';
import { Auth, AuthProps } from '@/features/auth/domain/entities/auth';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { LoginUserTypesEnum } from '@/utils/enums/login-user-types.enum';
import { IAuthResponse } from '@/features/auth/domain/dto/auth.response.dto.interface';
import { IUserListByEmailLoginUseCase } from '@/features/user/domain/use-cases/user-list-by-email-login.use-case.interface';
import { User } from '@/features/user/domain/entities/user';
import { Ability } from '@/acl/domain/entities/ability';
import { IAuthDto } from '@/features/auth/domain/dto/auth.dto.interface';
import { IJwtAuthService } from '@/jwt/domain/services/jwt-auth.service.interface';

@Injectable()
export class LoginService implements ILoginService {
  private authDto: IAuthDto;
  private loginType: LoginUserTypesEnum;
  private user: User;

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
    this.authDto = authDto;
    this.loginType = loginType;

    await this.handleValidations();

    return await this.generateAuth();
  }

  private async handleValidations(): Promise<void> {
    this.user = await this.userListByEmailLoginUseCase.execute(
      this.authDto.email,
      this.loginType,
    );

    if (!(await Hash.compareHash(this.authDto.password, this.user.password))) {
      throw new UnauthorizedException(ErrorMessagesEnum.UNAUTHORIZED_LOGIN);
    }

    if (!this.user.active) {
      throw new UnauthorizedException(ErrorMessagesEnum.INACTIVE_USER);
    }
  }

  private async generateAuth(): Promise<IAuthResponse> {
    const payload = {
      sub: this.user.uuid,
      user: {
        uuid: this.user.uuid,
        profileUuid: this.user.profileUuid,
        email: this.user.email,
        active: this.user.active,
      },
    };

    const authenticate: IJwtToken = this.jwtAuthService.sign(payload);

    const ability: Ability[] = await this.abilityRepository.findAllByUserUuid(
      this.user.uuid,
    );

    const auth = await Auth.create({
      userUuid: this.user.uuid,
      initialDate: moment().toDate(),
      finalDate: moment().add(2, 'days').toDate(),
      token: authenticate.token,
      ipAddress: this.authDto.ipAddress,
      authType: AuthTypesEnum.EMAIL_PASSWORD,
      active: true,
    } as AuthProps);

    await this.authRepository.create(auth);

    return {
      token: authenticate.token,
      type: authenticate.type,
      expiresIn: `${authenticate.expiration / 86400} days`,
      user: {
        uuid: this.user.uuid,
        email: this.user.email,
        fullName: this.user.person.name,
        shortName: this.user.person.shortName,
        role: this.user.profile.description,
        status: this.user.active,
        ability,
      },
    };
  }
}
