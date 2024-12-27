import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IAuthDto } from '@/features/auth/domain/dto/auth.dto.interface';

export class AuthDto implements IAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  userId: string;
  initialDate: Date;
  finalDate: Date;
  token: string;
  ipAddress: string;
  authType: string;
}
