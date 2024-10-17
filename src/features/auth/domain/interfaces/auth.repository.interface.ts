import { Auth } from '@/features/auth/domain/core/auth';

export interface IAuthRepository {
  create(auth: Auth): Promise<Auth>;
}
