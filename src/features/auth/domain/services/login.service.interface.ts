import { LoginUserTypesEnum } from '@/utils/enums/login-user-types.enum';
import { IAuthDto } from '@/features/auth/domain/dto/auth.dto.interface';
import { IJwtToken } from '@/jwt/domain/services/jwt-auth.service.interface';
import { Ability } from '@/acl/domain/entities/ability';

export interface IAuthUser {
  userUuid: string;
  name: string;
  email: string;
  password: string;
  shortName: string;
  profileUuid: string;
  profileDescription: string;
  profileUniqueName: string;
  active: boolean;
  createdAt: Date;
  birthDate?: string;
  phone?: string;
  zipCode?: string;
  address?: string;
  numberAddress?: string;
  complement?: string;
  district?: string;
  uf?: string;
  cityUuid?: string;
  cityDescription?: string;
}

export interface IPayload {
  sub: string;
  user: IAuthUser;
}

export interface IJwtTokenAuthUser {
  jwtToken: IJwtToken;
  user: IAuthUser;
  abilities: Ability[];
}

export interface ILoginService {
  handle(
    authDto: IAuthDto,
    loginType: LoginUserTypesEnum,
  ): Promise<IJwtTokenAuthUser>;
}

export const ILoginService = Symbol('ILoginService');
