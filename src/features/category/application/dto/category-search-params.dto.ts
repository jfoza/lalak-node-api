import { IsBoolean, IsIn, IsOptional, IsString, IsUUID } from 'class-validator';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { Transform } from 'class-transformer';
import { FiltersDto } from '@/common/application/dto/FiltersDto';

export class CategorySearchParamsDto extends FiltersDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  themeUuid?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsIn(['description', 'created_at'], {
    message: ErrorMessagesEnum.INVALID_COLUMN_NAME,
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  columnName: string | null = null;
}
