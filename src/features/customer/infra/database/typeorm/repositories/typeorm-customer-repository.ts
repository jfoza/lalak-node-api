import { ICustomerRepository } from '@/features/customer/domain/interfaces/repositories/customer-repository.interface';
import { Customer } from '@/features/customer/domain/core/customer';
import { User } from '@/features/user/domain/core/user';
import { CustomerSearchParamsDto } from '@/features/customer/application/dto/customer-search-params.dto';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';
import { paginate } from '@/common/infra/database/typeorm/pagination';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '@/features/customer/infra/database/typeorm/entities/customer.entity';
import { UserMapper } from '@/features/user/infra/database/typeorm/mappers/user.mapper';

@Injectable()
export class TypeormCustomerRepository implements ICustomerRepository {
  @InjectRepository(CustomerEntity)
  private readonly customerEntityRepository: Repository<CustomerEntity>;

  @InjectRepository(UserEntity)
  private readonly userEntityRepository: Repository<UserEntity>;

  @Inject(UserMapper)
  private readonly userMapper: UserMapper;

  async paginateResults(
    customerSearchParamsDto: CustomerSearchParamsDto,
  ): Promise<ILengthAwarePaginator> {
    const queryBuilder: SelectQueryBuilder<UserEntity> =
      this.getListBaseQueryFilters(customerSearchParamsDto);

    const result = await paginate<UserEntity>(queryBuilder, {
      page: customerSearchParamsDto.page,
      perPage: customerSearchParamsDto.perPage,
    });

    result.data = await this.userMapper.collection(result.data);

    return result;
  }

  async findByUserUuid(userUuid: string): Promise<User> {
    const result = await this.getListBaseQuery()
      .andWhere('user.uuid = :userUuid', { userUuid })
      .getOne();

    return this.userMapper.optional(result);
  }

  async create(customer: Customer): Promise<Customer> {
    const customerEntity: CustomerEntity = this.customerEntityRepository.create(
      {
        uuid: customer.uuid,
        user_uuid: customer.userUuid,
        verified_email: customer.verifiedEmail,
        created_at: customer.createdAt,
      },
    );

    await this.customerEntityRepository.save(customerEntity);

    return customer;
  }

  async update(customer: Customer): Promise<Customer> {
    await this.customerEntityRepository.update(customer.uuid, {
      verified_email: customer.verifiedEmail,
    });

    return customer;
  }

  private getListBaseQuery(): SelectQueryBuilder<UserEntity> {
    return this.userEntityRepository
      .createQueryBuilder('user')
      .select([
        'user.uuid',
        'user.email',
        'user.active',
        'user.created_at',
        'customer',
        'person',
        'profile',
      ])
      .innerJoinAndSelect('user.customer', 'customer')
      .innerJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('person.city', 'city')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('customer.uuid IS NOT NULL');
  }

  private getListBaseQueryFilters(
    customerSearchParamsDto: CustomerSearchParamsDto,
  ): SelectQueryBuilder<UserEntity> {
    const queryBuilder = this.getListBaseQuery();

    queryBuilder
      .when(customerSearchParamsDto.name, (qb, name) =>
        qb.andWhere('user.name ILIKE :name', { name: `%${name}%` }),
      )
      .when(customerSearchParamsDto.email, (qb, email) =>
        qb.andWhere('user.email = :email', { email }),
      )
      .when(
        customerSearchParamsDto.columnName,
        (qb) =>
          qb.orderBy(
            `user.${customerSearchParamsDto.columnName}`,
            customerSearchParamsDto.columnOrder,
          ),
        (qb) => qb.orderBy(`user.created_at`, 'DESC'),
      );

    return queryBuilder;
  }
}
