import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class SearchParamsDto {
  protected requiredPagination: boolean = false;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'], {
    message: 'Invalid column order. Allowed values are ASC or DESC.',
  })
  @Transform(
    ({ value }) =>
      value && typeof value === 'string' ? value.toUpperCase() : undefined,
    { toClassOnly: true },
  )
  columnOrder: 'ASC' | 'DESC' = 'DESC';

  @IsOptional()
  @IsString()
  columnName: string = 'created_at';

  @ValidateIf((dto: SearchParamsDto) => dto.requiredPagination)
  @IsNotEmpty({ message: 'The page parameter is required.' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number | null = null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  perPage: number = 100;

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
