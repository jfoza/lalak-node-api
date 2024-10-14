import { AuthDto } from '@/features/auth/application/dto/auth.dto';
import { LoginUserTypesEnum } from '@/common/infra/enums/login-user-types.enum';
import { IAuthResponse } from '@/features/auth/application/outputs/auth.response.interface';

export interface ILoginService {
  handle(
    authDto: AuthDto,
    loginType: LoginUserTypesEnum,
  ): Promise<IAuthResponse>;
}
