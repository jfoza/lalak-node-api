import { Person } from '@/features/user/domain/entities/person';
import { IAdminUserUpdateDto } from '@/features/user/domain/dto/admin-user-update.dto.interface';

export interface IAdminUserUpdateService {
  handle(
    uuid: string,
    adminUserUpdateDto: IAdminUserUpdateDto,
  ): Promise<Person>;
}

export const IAdminUserUpdateService = Symbol('IAdminUserUpdateService');
