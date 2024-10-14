import { Provider } from '@nestjs/common';
import { ProvidersType } from '@/common/infra/providers/provider.type';
import { TypeormCustomerRepository } from '@/features/customer/infra/database/typeorm/repositories/typeorm-customer-repository';
import { CustomerListUseCase } from '@/features/customer/application/use-cases/customer-list.use-case';
import { CustomerCreateUseCase } from '@/features/customer/application/use-cases/customer-create.use-case';
import { CustomerListByIdUseCase } from '@/features/customer/application/use-cases/customer-list-by-id.use-case';
import { CustomerUpdateUseCase } from '@/features/customer/application/use-cases/customer-update.use-case';
import { ManyCustomersCreateUseCase } from '@/features/customer/application/use-cases/many-customers-create.use-case';

export const customerProvider: ProvidersType = {
  repositoryProviders: [
    TypeormCustomerRepository,
    {
      provide: 'ICustomerRepository',
      useExisting: TypeormCustomerRepository,
    },
  ],

  serviceProviders: [],

  useCaseProviders: [
    CustomerListUseCase,
    {
      provide: 'ICustomerListUseCase',
      useClass: CustomerListUseCase,
    },

    CustomerListByIdUseCase,
    {
      provide: 'ICustomerListByIdUseCase',
      useClass: CustomerListByIdUseCase,
    },

    CustomerCreateUseCase,
    {
      provide: 'ICustomerCreateUseCase',
      useClass: CustomerCreateUseCase,
    },

    ManyCustomersCreateUseCase,
    {
      provide: 'IManyCustomersCreateUseCase',
      useClass: ManyCustomersCreateUseCase,
    },

    CustomerUpdateUseCase,
    {
      provide: 'ICustomerUpdateUseCase',
      useClass: CustomerUpdateUseCase,
    },
  ],

  register(): Provider[] {
    return [
      ...this.repositoryProviders,
      ...this.serviceProviders,
      ...this.useCaseProviders,
    ];
  },

  exports(): string[] {
    return [];
  },
};
