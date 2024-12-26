import { User } from '@/features/user/domain/entities/user';
import { UpdateAdminUserDto } from '@/features/user/application/dto/update-admin-user.dto';

export interface IAdminUserUpdateUseCase {
  execute(uuid: string, updateAdminUserDto: UpdateAdminUserDto): Promise<User>;
}

export const IAdminUserUpdateUseCase = Symbol('IAdminUserUpdateUseCase');
