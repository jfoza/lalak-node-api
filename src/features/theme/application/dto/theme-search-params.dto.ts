import { IsIn, IsOptional, IsString } from 'class-validator';
import { FiltersDto } from '@/common/application/dto/FiltersDto';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { Transform } from 'class-transformer';

export class ThemeSearchParamsDto extends FiltersDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsIn(['description', 'created_at'], {
    message: ErrorMessagesEnum.INVALID_COLUMN_NAME,
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  columnName: string | null = null;
}
