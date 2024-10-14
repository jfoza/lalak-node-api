import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
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
