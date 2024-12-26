import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductCreateDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  details?: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  value: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
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
