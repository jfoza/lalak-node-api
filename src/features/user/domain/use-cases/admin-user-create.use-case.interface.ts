import { User } from '@/features/user/domain/entities/user';
import { CreateAdminUserDto } from '@/features/user/application/dto/create-admin-user.dto';

export interface IAdminUserCreateUseCase {
  execute(createAdminUserDto: CreateAdminUserDto): Promise<User>;
}

export const IAdminUserCreateUseCase = Symbol('IAdminUserCreateUseCase');
