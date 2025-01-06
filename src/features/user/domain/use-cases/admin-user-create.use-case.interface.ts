import { Person } from '@/features/user/domain/entities/person';
import { IAdminUserCreateDto } from '@/features/user/domain/dto/admin-user-create.dto.interface';

export interface IAdminUserCreateUseCase {
  createUserForAdminMaster(
    createAdminUserDto: IAdminUserCreateDto,
  ): Promise<Person>;
  createUserForEmployee(
    createAdminUserDto: IAdminUserCreateDto,
  ): Promise<Person>;
}

export const IAdminUserCreateUseCase = Symbol('IAdminUserCreateUseCase');
