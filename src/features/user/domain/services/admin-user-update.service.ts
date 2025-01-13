import { IAdminUserUpdateDto } from '@/features/user/domain/dto/admin-user-update.dto.interface';
import { User } from '@/features/user/domain/entities/user';

export interface IAdminUserUpdateService {
  handle(uuid: string, adminUserUpdateDto: IAdminUserUpdateDto): Promise<User>;
}

export const IAdminUserUpdateService = Symbol('IAdminUserUpdateService');
