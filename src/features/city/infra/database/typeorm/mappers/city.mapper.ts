import { CityEntity } from '@/features/city/infra/database/typeorm/entities/city.entity';
import { City, CityProps } from '@/features/city/domain/core/city';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';

@Injectable()
export class CityMapper extends Mapper<CityEntity, City> {
  async from(ormEntity: CityEntity): Promise<City> {
    const props: CityProps = {
      description: ormEntity.description,
      uf: ormEntity.uf,
      active: ormEntity.active,
    };

    return City.create(props, ormEntity.uuid);
  }
}
