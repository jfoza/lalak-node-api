import { CreateCustomerDto } from '@/features/customer/application/dto/create-customer.dto';
import { IUpdateCustomerDto } from '@/features/customer/domain/dto/update-customer.dto.interface';

export class UpdateCustomerDto
  extends CreateCustomerDto
  implements IUpdateCustomerDto {}
