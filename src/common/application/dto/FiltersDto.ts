import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
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

  page: number | null = null;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  perPage: number | null = 20;
}
