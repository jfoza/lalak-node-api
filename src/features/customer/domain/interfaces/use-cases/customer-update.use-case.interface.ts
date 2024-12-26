import { User } from '@/features/user/domain/entities/user';
import { UpdateCustomerDto } from '@/features/customer/application/dto/update-customer.dto';

export interface ICustomerUpdateUseCase {
  execute(uuid: string, updateCustomerDto: UpdateCustomerDto): Promise<User>;
}
