import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import moment from 'moment';
import { ILoginService } from '@/features/auth/domain/interfaces/login.service.interface';
import { AuthDto } from '@/features/auth/application/dto/auth.dto';
import { IAuthRepository } from '@/features/auth/domain/interfaces/auth.repository.interface';
import { IAclRepository } from '@/acl/domain/interfaces/acl.repository.interface';
import { JwtAuthService } from '@/jwt/application/services/jwt-auth.service';
import { IJwtToken } from '@/jwt/domain/interfaces/jwt-token.interface';
import { Ability } from '@/acl/domain/core/ability';
import { Hash } from '@/common/infra/utils/hash';
import { AuthTypesEnum } from '@/common/infra/enums/auth-types.enum';
import { Auth, AuthProps } from '@/features/auth/domain/core/auth';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { LoginUserTypesEnum } from '@/common/infra/enums/login-user-types.enum';
import { IAuthResponse } from '@/features/auth/application/outputs/auth.response.interface';
import { IUserListByEmailLoginUseCase } from '@/features/user/domain/use-cases/user-list-by-email-login.use-case.interface';
import { User } from '@/features/user/domain/core/user';

@Injectable()
export class LoginService implements ILoginService {
  private authDto: AuthDto;
  private loginType: LoginUserTypesEnum;
  private user: User;

  constructor(
    @Inject('IUserListByEmailLoginUseCase')
    private readonly userListByEmailLoginUseCase: IUserListByEmailLoginUseCase,

    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,

    @Inject('IAclRepository')
    private readonly abilityRepository: IAclRepository,

    @Inject(JwtAuthService)
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async handle(
    authDto: AuthDto,
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

    const authenticate: IJwtToken = this.jwtAuthService.authenticate(payload);

    const ability: Ability[] = await this.abilityRepository.findAllByUserId(
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
