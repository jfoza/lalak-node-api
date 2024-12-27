import { Auth } from '@/features/auth/domain/entities/auth';

export interface IAuthRepository {
  create(auth: Auth): Promise<Auth>;
}

export const IAuthRepository = Symbol('IAuthRepository');
