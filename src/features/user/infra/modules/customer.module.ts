import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '@/features/user/infra/database/typeorm/entities/customer.entity';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';
import { CustomerController } from '@/features/user/presentation/controllers/customer.controller';
import { PersonEntity } from '@/features/user/infra/database/typeorm/entities/person.entity';
import { ProfileEntity } from '@/features/user/infra/database/typeorm/entities/profile.entity';
import { CityModule } from '@/features/city/infra/modules/city.module';
import { CustomerListService } from '@/features/user/application/services/customer-list.service';
import { CustomerListByUuidService } from '@/features/user/application/services/customer-list-by-uuid.service';
import { CustomerCreateService } from '@/features/user/application/services/customer-create.service';
import { CustomerUpdateService } from '@/features/user/application/services/customer-update.service';
import { UserModule } from '@/features/user/infra/modules/user.module';
import { ICustomerListService } from '@/features/user/domain/services/customer-list.service';
import { ICustomerListByUuidService } from '@/features/user/domain/services/customer-list-by-uuid.service';
import { ICustomerCreateService } from '@/features/user/domain/services/customer-create.service';
import { ICustomerUpdateService } from '@/features/user/domain/services/customer-update.service';
import { TypeormPersonCustomerRepository } from '@/features/user/infra/database/typeorm/repositories/typeorm.person-customer.repository';
import { PersonCustomerRepository } from '@/features/user/domain/repositories/person-customer.repository';

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
    TypeormPersonCustomerRepository,
    {
      provide: PersonCustomerRepository,
      useClass: TypeormPersonCustomerRepository,
    },

    CustomerListService,
    {
      provide: ICustomerListService,
      useClass: CustomerListService,
    },

    CustomerListByUuidService,
    {
      provide: ICustomerListByUuidService,
      useClass: CustomerListByUuidService,
    },

    CustomerCreateService,
    {
      provide: ICustomerCreateService,
      useClass: CustomerCreateService,
    },

    CustomerUpdateService,
    {
      provide: ICustomerUpdateService,
      useClass: CustomerUpdateService,
    },
  ],
  exports: [PersonCustomerRepository],
})
export class CustomerModule {}
