import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';
import { User } from '@/features/user/domain/entities/user';

export interface AdminUserRepository {
  findAll(adminUserSearchParamsDto: IAdminUserSearchParamsDto): Promise<User[]>;
  findByUuid(uuid: string): Promise<User>;
  findOneForLogin(email: string): Promise<User>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
}

export const AdminUserRepository = Symbol('AdminUserRepository');
