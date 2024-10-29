import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

export class FiltersDto {
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'], {
    message: ErrorMessagesEnum.INVALID_COLUMN_ORDER,
  })
  @Transform(
    ({ value }) =>
      value && typeof value === 'string' ? value.toUpperCase() : undefined,
    { toClassOnly: true },
  )
  columnOrder: 'ASC' | 'DESC' = 'DESC';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number | null = null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  perPage: number | null = 100;

  @IsOptional()
  @Transform(
    ({ value }) => {
      if (value === 'true' || value === '1') return true;
      if (value === 'false' || value === '0') return false;
      return undefined;
    },
    { toClassOnly: true },
  )
  @IsBoolean()
  active?: boolean;
}
