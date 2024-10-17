import { Mapper } from '@/common/infra/database/typeorm/Mapper';
import { CityEntity } from '@/features/city/infra/database/typeorm/entities/city.entity';
import { City, CityProps } from '@/features/city/domain/core/city';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CityMapper extends Mapper<CityEntity, City, CityProps> {
  protected snakeCaseMapper: boolean = true;

  protected async toDomainEntity(
    props: CityProps,
    uuid: string,
  ): Promise<City> {
    return City.create(props, uuid);
  }
}
