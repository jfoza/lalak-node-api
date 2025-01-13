import { IAdminUserCreateDto } from '@/features/user/domain/dto/admin-user-create.dto.interface';
import { User } from '@/features/user/domain/entities/user';

export interface IAdminUserCreateUseCase {
  createUserForAdminMaster(
    createAdminUserDto: IAdminUserCreateDto,
  ): Promise<User>;
  createUserForEmployee(createAdminUserDto: IAdminUserCreateDto): Promise<User>;
}

export const IAdminUserCreateUseCase = Symbol('IAdminUserCreateUseCase');
