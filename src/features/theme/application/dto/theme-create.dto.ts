import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IThemeCreateDto } from '@/features/theme/domain/dto/theme-create.dto.interface';

export class ThemeCreateDto implements IThemeCreateDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
