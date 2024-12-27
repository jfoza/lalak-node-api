import { User } from '@/features/user/domain/entities/user';
import { ICreateAdminUserDto } from '@/features/user/domain/dto/create-admin-user.dto.interface';

export interface IAdminUserCreateUseCase {
  execute(createAdminUserDto: ICreateAdminUserDto): Promise<User>;
}

export const IAdminUserCreateUseCase = Symbol('IAdminUserCreateUseCase');
