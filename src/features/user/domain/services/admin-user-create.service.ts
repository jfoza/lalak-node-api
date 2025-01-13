import { IAdminUserCreateDto } from '@/features/user/domain/dto/admin-user-create.dto.interface';
import { User } from '@/features/user/domain/entities/user';

export interface IAdminUserCreateService {
  handle(adminUserCreateDto: IAdminUserCreateDto): Promise<User>;
}

export const IAdminUserCreateService = Symbol('IAdminUserCreateService');
