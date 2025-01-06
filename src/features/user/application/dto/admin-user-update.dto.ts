import { AdminUserCreateDto } from '@/features/user/application/dto/admin-user-create.dto';
import { IsOptional, IsString } from 'class-validator';
import { IAdminUserUpdateDto } from '@/features/user/domain/dto/admin-user-update.dto.interface';

export class AdminUserUpdateDto
  extends AdminUserCreateDto
  implements IAdminUserUpdateDto
{
  @IsOptional()
  @IsString()
  password?: string;
}
