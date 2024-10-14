import { User } from '@/features/user/domain/core/user';
import { UpdateCustomerDto } from '@/features/customer/application/dto/update-customer.dto';

export interface ICustomerUpdateUseCase {
  execute(uuid: string, updateCustomerDto: UpdateCustomerDto): Promise<User>;
}
