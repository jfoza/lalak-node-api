import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { FiltersDto } from '@/common/application/dto/FiltersDto';
import { ICustomerSearchParamsDto } from '@/features/customer/domain/dto/customer-search-params.dto.interface';

export class CustomerSearchParamsDto
  extends FiltersDto
  implements ICustomerSearchParamsDto
{
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  name?: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => (value === '' ? undefined : value))
  email?: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  page: number;

  @IsOptional()
  @IsIn(['name', 'email', 'created_at'], {
    message: ErrorMessagesEnum.INVALID_COLUMN_NAME,
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  columnName: string | null = null;
}
