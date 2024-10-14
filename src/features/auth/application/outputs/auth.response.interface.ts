import { Rule } from '@/acl/domain/core/rule';

interface IAuthUser {
  uuid: string;
  email: string;
  fullName: string;
  shortName: string;
  role: string;
  status: boolean;
  ability: Rule[];
}

export interface IAuthResponse {
  token: string;
  type: string;
  expiresIn: string;
  user: IAuthUser;
}
