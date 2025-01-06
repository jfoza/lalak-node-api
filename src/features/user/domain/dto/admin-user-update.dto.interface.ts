import { IAdminUserCreateDto } from '@/features/user/domain/dto/admin-user-create.dto.interface';

export class IAdminUserUpdateDto extends IAdminUserCreateDto {
  password?: string;
}
