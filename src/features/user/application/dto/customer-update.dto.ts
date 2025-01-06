import { ICustomerUpdateDto } from '@/features/user/domain/dto/customer-update.dto.interface';
import { CustomerCreateDto } from '@/features/user/application/dto/create-customer.dto';

export class CustomerUpdateDto
  extends CustomerCreateDto
  implements ICustomerUpdateDto {}
