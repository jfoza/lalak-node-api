import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '@/features/customer/infra/database/typeorm/entities/customer.entity';
import { customerProvider } from '@/features/customer/infra/providers/customer.provider';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';
import { CustomerController } from '@/features/customer/presentation/controllers/customer.controller';
import { PersonEntity } from '@/features/user/infra/database/typeorm/entities/person.entity';
import { ProfileEntity } from '@/features/user/infra/database/typeorm/entities/profile.entity';
import { CityModule } from '@/features/city/infra/modules/city.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerEntity,
      PersonEntity,
      ProfileEntity,
      UserEntity,
    ]),
    CityModule,
  ],
  controllers: [CustomerController],
  providers: [...customerProvider.register()],
  exports: [...customerProvider.exports()],
})
export class CustomerModule {}
