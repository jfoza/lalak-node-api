import { Ability } from '@/acl/domain/core/ability';

interface IAuthUser {
  uuid: string;
  email: string;
  fullName: string;
  shortName: string;
  role: string;
  status: boolean;
  ability: Ability[];
}

export interface IAuthResponse {
  token: string;
  type: string;
  expiresIn: string;
  user: IAuthUser;
}
