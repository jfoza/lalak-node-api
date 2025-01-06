import { Person } from '@/features/user/domain/entities/person';
import { IAdminUserCreateDto } from '@/features/user/domain/dto/admin-user-create.dto.interface';

export interface IAdminUserCreateService {
  handle(adminUserCreateDto: IAdminUserCreateDto): Promise<Person>;
}

export const IAdminUserCreateService = Symbol('IAdminUserCreateService');
