import { City } from '@/features/city/domain/entities/city';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from '@/features/city/infra/database/typeorm/entities/city.entity';
import { Repository } from 'typeorm';
import { CityMapper } from '@/features/city/infra/database/typeorm/mappers/city.mapper';
import { CityRepository } from '@/features/city/domain/repositories/city.repository';

export class TypeormCityRepository implements CityRepository {
  @InjectRepository(CityEntity)
  private readonly cityEntityRepository: Repository<CityEntity>;

  async findById(uuid: string): Promise<City | null> {
    const result = await this.cityEntityRepository.findOne({
      where: { uuid },
    });

    return CityMapper.toDomain.optional(result);
  }

  async findByDescription(description: string): Promise<City | null> {
    const result = await this.cityEntityRepository.findOne({
      where: { description },
    });

    return CityMapper.toDomain.optional(result);
  }

  async findByUf(uf: string): Promise<City[]> {
    const result = await this.cityEntityRepository.find({ where: { uf } });

    return CityMapper.toDomain.collection(result);
  }
}
