import { CreateAdminUserDto } from '@/features/user/application/dto/create-admin-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAdminUserDto extends CreateAdminUserDto {
  @IsOptional()
  @IsString()
  password?: string;
}
