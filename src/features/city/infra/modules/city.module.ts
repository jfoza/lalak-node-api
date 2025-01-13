import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from '@/features/city/infra/database/typeorm/entities/city.entity';
import { TypeormCityRepository } from '@/features/city/infra/database/typeorm/repositories/typeorm-city.repository';
import { TypeormCityMapper } from '@/features/city/infra/database/typeorm/mappers/typeorm.city.mapper';
import { CityRepository } from '@/features/city/domain/repositories/city.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  controllers: [],
  providers: [
    TypeormCityMapper,
    TypeormCityRepository,
    {
      provide: CityRepository,
      useExisting: TypeormCityRepository,
    },
  ],
  exports: [TypeormCityMapper, CityRepository],
})
export class CityModule {}
