import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class EventCreateDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
