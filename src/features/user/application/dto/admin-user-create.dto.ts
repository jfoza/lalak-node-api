import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IAdminUserCreateDto } from '@/features/user/domain/dto/admin-user-create.dto.interface';

export class AdminUserCreateDto implements IAdminUserCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password?: string;

  @IsNotEmpty()
  @IsUUID()
  profileUuid: string;
}
