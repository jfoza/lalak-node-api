import { User } from '@/features/user/domain/core/user';
import { CreateAdminUserDto } from '@/features/user/application/dto/create-admin-user.dto';

export interface IAdminUserCreateUseCase {
  execute(createAdminUserDto: CreateAdminUserDto): Promise<User>;
}
