import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class ProductCreateDto {
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsOptional()
  @IsString()
  details?: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  categories: string[] = [];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  events: string[] = [];
}
