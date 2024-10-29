import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateIf,
} from 'class-validator';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { Transform, Type } from 'class-transformer';
import { FiltersDto } from '@/common/application/dto/FiltersDto';

export class ProductSearchParamsDto extends FiltersDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  userUuid?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', {
    each: true,
  })
  categories?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('all', {
    each: true,
  })
  events?: string[];

  @ValidateIf((o) => o.page !== undefined)
  @IsNotEmpty()
  @Type(() => Number)
  @Min(1)
  page: number;

  @IsOptional()
  @IsIn(['description', 'value', 'active', 'createdAt'], {
    message: ErrorMessagesEnum.INVALID_COLUMN_NAME,
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  columnName: string | null = null;
}
