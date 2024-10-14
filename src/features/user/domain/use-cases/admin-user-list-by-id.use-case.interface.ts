import { User } from '@/features/user/domain/core/user';

export interface IAdminUserListById {
  execute(userUuid: string): Promise<User>;
}
