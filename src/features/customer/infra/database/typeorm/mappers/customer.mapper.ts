import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';
import { CustomerEntity } from '@/features/customer/infra/database/typeorm/entities/customer.entity';
import {
  Customer,
  CustomerProps,
} from '@/features/customer/domain/entities/customer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerMapper extends Mapper<CustomerEntity, Customer> {
  async from(ormEntity: CustomerEntity): Promise<Customer> {
    const props: CustomerProps = {
      userUuid: ormEntity.user_uuid,
      verifiedEmail: ormEntity.verified_email,
      createdAt: ormEntity.created_at,
    };

    return Customer.create(props, ormEntity.uuid);
  }
}
