import { ICityRepository } from '@/features/city/domain/interfaces/city.repository.interface';
import { City } from '@/features/city/domain/core/city';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from '@/features/city/infra/database/typeorm/entities/city.entity';
import { Repository } from 'typeorm';
import { CityMapper } from '@/features/city/infra/database/typeorm/mappers/city.mapper';
import { Inject } from '@nestjs/common';

export class TypeormCityRepository implements ICityRepository {
  @InjectRepository(CityEntity)
  private readonly cityEntityRepository: Repository<CityEntity>;

  @Inject(CityMapper)
  private readonly cityMapper: CityMapper;

  async findById(uuid: string): Promise<City | null> {
    const result = await this.cityEntityRepository.findOne({
      where: { uuid },
    });

    return this.cityMapper.optional(result);
  }

  async findByDescription(description: string): Promise<City | null> {
    const result = await this.cityEntityRepository.findOne({
      where: { description },
    });

    return this.cityMapper.optional(result);
  }

  async findByUf(uf: string): Promise<City[]> {
    const result = await this.cityEntityRepository.find({ where: { uf } });

    return this.cityMapper.collection(result);
  }
}
