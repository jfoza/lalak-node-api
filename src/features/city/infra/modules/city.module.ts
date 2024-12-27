import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from '@/features/city/infra/database/typeorm/entities/city.entity';
import { TypeormCityRepository } from '@/features/city/infra/database/typeorm/repositories/typeorm-city.repository';
import { CityMapper } from '@/features/city/infra/database/typeorm/mappers/city.mapper';
import { ICityRepository } from '@/features/city/domain/interfaces/city.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  controllers: [],
  providers: [
    CityMapper,
    TypeormCityRepository,
    {
      provide: ICityRepository,
      useExisting: TypeormCityRepository,
    },
  ],
  exports: [CityMapper, ICityRepository],
})
export class CityModule {}
