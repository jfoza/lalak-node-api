import { CityEntity } from '@/features/city/infra/database/typeorm/entities/city.entity';
import { City, CityProps } from '@/features/city/domain/entities/city';
import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';
import { Uf } from '@/common/domain/value-objects/uf';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

export class CityMapper extends Mapper<CityEntity, City> {
  static get toDomain(): CityMapper {
    return new this();
  }

  async from(ormEntity: CityEntity): Promise<City> {
    const props: CityProps = {
      description: ormEntity.description,
      uf: Uf.create(ormEntity.uf),
      active: ormEntity.active,
    };

    return City.create(props, UniqueEntityId.create(ormEntity.uuid));
  }
}
