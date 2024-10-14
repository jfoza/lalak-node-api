import { Auth } from '@/features/auth/domain/core/Auth';

export interface IAuthRepository {
  create(auth: Auth): Promise<Auth>;
}
