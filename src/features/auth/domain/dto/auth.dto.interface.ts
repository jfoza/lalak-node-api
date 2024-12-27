export interface IAuthDto {
  email: string;
  password: string;
  userId: string;
  initialDate: Date;
  finalDate: Date;
  token: string;
  ipAddress: string;
  authType: string;
}
