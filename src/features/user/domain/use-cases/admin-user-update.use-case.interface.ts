import { Person } from '@/features/user/domain/entities/person';
import { IAdminUserUpdateDto } from '@/features/user/domain/dto/admin-user-update.dto.interface';

export interface IAdminUserUpdateUseCase {
  updateUserForAdminMaster(
    uuid: string,
    updateAdminUserDto: IAdminUserUpdateDto,
  ): Promise<Person>;

  updateUserForEmployee(
    uuid: string,
    updateAdminUserDto: IAdminUserUpdateDto,
  ): Promise<Person>;
}

export const IAdminUserUpdateUseCase = Symbol('IAdminUserUpdateUseCase');
