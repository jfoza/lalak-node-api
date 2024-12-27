import { ICreateAdminUserDto } from '@/features/user/domain/dto/create-admin-user.dto.interface';

export class IUpdateAdminUserDto extends ICreateAdminUserDto {
  password?: string;
}
