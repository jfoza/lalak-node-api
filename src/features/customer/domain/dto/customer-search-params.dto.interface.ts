import { FiltersDto } from '@/common/application/dto/FiltersDto';

export class ICustomerSearchParamsDto extends FiltersDto {
  name?: string;
  email?: string;
  page: number;
  columnName: string | null = null;
}
