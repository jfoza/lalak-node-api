import { City } from '@/features/city/domain/entities/city';

export interface CityRepository {
  findById(uuid: string): Promise<City | null>;
  findByDescription(description: string): Promise<City | null>;
  findByUf(uf: string): Promise<City[]>;
}

export const CityRepository = Symbol('CityRepository');
