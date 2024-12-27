import { FiltersDto } from '@/common/application/dto/FiltersDto';

export class IAdminUserSearchParamsDto extends FiltersDto {
  name?: string;
  email?: string;
  page: number;
  profilesUniqueName: string[];
  columnName: string | null = null;
}
