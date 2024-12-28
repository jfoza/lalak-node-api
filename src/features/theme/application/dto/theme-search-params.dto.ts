import { IsIn, IsOptional, IsString } from 'class-validator';
import { SearchParamsDto } from '@/common/application/dto/search-params.dto';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { Transform } from 'class-transformer';

export class ThemeSearchParamsDto extends SearchParamsDto {
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
