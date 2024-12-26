import { User } from '@/features/user/domain/entities/user';
import { CreateCustomerDto } from '@/features/customer/application/dto/create-customer.dto';

export interface ICustomerCreateUseCase {
  execute(createCustomerDto: CreateCustomerDto): Promise<User>;
}
