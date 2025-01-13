import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '@/features/user/domain/repositories/customer.repository';
import { ICustomerSearchParamsDto } from '@/features/user/domain/dto/customer-search-params.dto.interface';
import { User } from '@/features/user/domain/entities/user';

@Injectable()
export class TypeormCustomerRepository implements CustomerRepository {
  create(user: User): Promise<User> {
    return Promise.resolve(undefined);
  }

  findAll(customerSearchParamsDto: ICustomerSearchParamsDto): Promise<User[]> {
    return Promise.resolve([]);
  }

  findByUuid(uuid: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  findOneForLogin(email: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  update(user: User): Promise<User> {
    return Promise.resolve(undefined);
  }
}
