import { Readable } from 'stream';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
  IsEnum,
  Max,
} from 'class-validator';
import { FileTypeEnum } from '@/utils/enums/file-type.enum';
import { AbstractFileDto } from '@/upload/domain/dto/file.dto.interface';

export class FileDto implements AbstractFileDto {
  @IsOptional()
  @IsString()
  fieldname?: string;

  @IsOptional()
  @IsString()
  originalname?: string;

  @IsOptional()
  @IsString()
  encoding?: string;

  @IsOptional()
  @IsString()
  mimetype?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(5 * 1024 * 1024)
  size?: number;

  @IsOptional()
  stream?: Readable;

  @IsOptional()
  @IsString()
  destination?: string;

  @IsOptional()
  @IsString()
  filename?: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  buffer?: Buffer;

  @IsOptional()
  @IsEnum(FileTypeEnum)
  type?: FileTypeEnum;
}
