import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateThemeDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
