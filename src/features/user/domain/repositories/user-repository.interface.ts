import { User } from '@/features/user/domain/entities/user';

export interface IUserRepository {
  findByUuid(uuid: string): Promise<User | null>;
  findByUserLoggedByUuid(uuid: string, relation: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailInLogin(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  updateStatus(uuid: string, newStatus: boolean): Promise<void>;
  updatePassword(uuid: string, newPassword: string): Promise<void>;
  update(user: User): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');
