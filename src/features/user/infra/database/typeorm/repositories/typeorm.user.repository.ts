import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/features/user/domain/repositories/user-repository';
import { User } from '@/features/user/domain/entities/user';

@Injectable()
export class TypeormUserRepository implements UserRepository {
  findUserByEmail(email: string): Promise<User | null> {
    return Promise.resolve(undefined);
  }

  findUserByUuid(uuid: string): Promise<User | null> {
    return Promise.resolve(undefined);
  }

  updateUserPassword(uuid: string, newPassword: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  updateUserStatus(uuid: string, newStatus: boolean): Promise<void> {
    return Promise.resolve(undefined);
  }
}
