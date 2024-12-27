import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ICreateAdminUserDto } from '@/features/user/domain/dto/create-admin-user.dto.interface';

export class CreateAdminUserDto implements ICreateAdminUserDto {
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
