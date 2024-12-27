import { CreateAdminUserDto } from '@/features/user/application/dto/create-admin-user.dto';
import { IsOptional, IsString } from 'class-validator';
import { IUpdateAdminUserDto } from '@/features/user/domain/dto/update-admin-user.dto.interface';

export class UpdateAdminUserDto
  extends CreateAdminUserDto
  implements IUpdateAdminUserDto
{
  @IsOptional()
  @IsString()
  password?: string;
}
