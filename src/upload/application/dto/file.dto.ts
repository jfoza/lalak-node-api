import { Readable } from 'stream';

import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsEnum,
  Max,
} from 'class-validator';

export enum FileType {
  IMAGE = 'image',
  AVATAR = 'avatar',
}

export class FileDto {
  @IsString()
  @IsNotEmpty()
  fieldname: string;

  @IsString()
  @IsNotEmpty()
  originalname: string;

  @IsString()
  encoding: string;

  @IsString()
  mimetype: string;

  @IsNumber()
  @IsPositive()
  @Max(5 * 1024 * 1024)
  size: number;

  @IsOptional()
  stream: Readable;

  @IsString()
  destination: string;

  @IsString()
  filename: string;

  @IsString()
  path: string;

  @IsOptional()
  buffer: Buffer;

  @IsEnum(FileType)
  @IsOptional()
  type: FileType;
}
