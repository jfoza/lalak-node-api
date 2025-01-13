import { IAdminUserUpdateDto } from '@/features/user/domain/dto/admin-user-update.dto.interface';
import { User } from '@/features/user/domain/entities/user';

export interface IAdminUserUpdateUseCase {
  updateUserForAdminMaster(
    uuid: string,
    updateAdminUserDto: IAdminUserUpdateDto,
  ): Promise<User>;

  updateUserForEmployee(
    uuid: string,
    updateAdminUserDto: IAdminUserUpdateDto,
  ): Promise<User>;
}

export const IAdminUserUpdateUseCase = Symbol('IAdminUserUpdateUseCase');
