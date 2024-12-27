import { BrazilianStates } from '@/utils/enums/brazilian-states.enum';

export class ICreateCustomerDto {
  name: string;
  email: string;
  birthDate: string;
  phone: string;
  zipCode: string;
  address: string;
  numberAddress: string;
  complement?: string;
  district: string;
  uf: BrazilianStates;
  cityUuid: string;
}
