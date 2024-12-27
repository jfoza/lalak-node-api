import { LoginUserTypesEnum } from '@/utils/enums/login-user-types.enum';
import { IAuthDto } from '@/features/auth/domain/dto/auth.dto.interface';
import { IAuthResponse } from '@/features/auth/domain/dto/auth.response.dto.interface';

export interface ILoginService {
  handle(
    authDto: IAuthDto,
    loginType: LoginUserTypesEnum,
  ): Promise<IAuthResponse>;
}

export const ILoginService = Symbol('ILoginService');
