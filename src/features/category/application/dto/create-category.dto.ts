import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  themeUuid: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
