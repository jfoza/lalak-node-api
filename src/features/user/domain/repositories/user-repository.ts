import { User } from '@/features/user/domain/entities/user';

export interface UserRepository {
  findUserByUuid(uuid: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  updateUserStatus(uuid: string, newStatus: boolean): Promise<void>;
  updateUserPassword(uuid: string, newPassword: string): Promise<void>;
}

export const UserRepository = Symbol('UserRepository');
