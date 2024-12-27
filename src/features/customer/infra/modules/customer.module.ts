import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '@/features/customer/infra/database/typeorm/entities/customer.entity';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';
import { CustomerController } from '@/features/customer/presentation/controllers/customer.controller';
import { PersonEntity } from '@/features/user/infra/database/typeorm/entities/person.entity';
import { ProfileEntity } from '@/features/user/infra/database/typeorm/entities/profile.entity';
import { CityModule } from '@/features/city/infra/modules/city.module';
import { TypeormCustomerRepository } from '@/features/customer/infra/database/typeorm/repositories/typeorm-customer-repository';
import { CustomerListUseCase } from '@/features/customer/application/use-cases/customer-list.use-case';
import { CustomerListByIdUseCase } from '@/features/customer/application/use-cases/customer-list-by-id.use-case';
import { CustomerCreateUseCase } from '@/features/customer/application/use-cases/customer-create.use-case';
import { ManyCustomersCreateUseCase } from '@/features/customer/application/use-cases/many-customers-create.use-case';
import { CustomerUpdateUseCase } from '@/features/customer/application/use-cases/customer-update.use-case';
import { CustomerMapper } from '@/features/customer/infra/database/typeorm/mappers/customer.mapper';
import { ICustomerRepository } from '@/features/customer/domain/repositories/customer-repository.interface';
import { ICustomerListUseCase } from '@/features/customer/domain/use-cases/customer-list.use-case.interface';
import { ICustomerListByIdUseCase } from '@/features/customer/domain/use-cases/customer-list-by-id.use-case.interface';
import { ICustomerCreateUseCase } from '@/features/customer/domain/use-cases/customer-create.use-case.interface';
import { IManyCustomersCreateUseCase } from '@/features/customer/domain/use-cases/many-customers-create.use-case.interface';
import { ICustomerUpdateUseCase } from '@/features/customer/domain/use-cases/customer-update.use-case.interface';
import { UserModule } from '@/features/user/infra/modules/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerEntity,
      PersonEntity,
      ProfileEntity,
      UserEntity,
    ]),
    forwardRef(() => UserModule),
    CityModule,
  ],
  controllers: [CustomerController],
  providers: [
    CustomerMapper,
    TypeormCustomerRepository,
    {
      provide: ICustomerRepository,
      useExisting: TypeormCustomerRepository,
    },

    CustomerListUseCase,
    {
      provide: ICustomerListUseCase,
      useClass: CustomerListUseCase,
    },

    CustomerListByIdUseCase,
    {
      provide: ICustomerListByIdUseCase,
      useClass: CustomerListByIdUseCase,
    },

    CustomerCreateUseCase,
    {
      provide: ICustomerCreateUseCase,
      useClass: CustomerCreateUseCase,
    },

    ManyCustomersCreateUseCase,
    {
      provide: IManyCustomersCreateUseCase,
      useClass: ManyCustomersCreateUseCase,
    },

    CustomerUpdateUseCase,
    {
      provide: ICustomerUpdateUseCase,
      useClass: CustomerUpdateUseCase,
    },
  ],
  exports: [CustomerMapper],
})
export class CustomerModule {}
