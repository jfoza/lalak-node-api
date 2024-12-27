import { User } from '@/features/user/domain/entities/user';
import { IUpdateAdminUserDto } from '@/features/user/domain/dto/update-admin-user.dto.interface';

export interface IAdminUserUpdateUseCase {
  execute(uuid: string, updateAdminUserDto: IUpdateAdminUserDto): Promise<User>;
}

export const IAdminUserUpdateUseCase = Symbol('IAdminUserUpdateUseCase');
