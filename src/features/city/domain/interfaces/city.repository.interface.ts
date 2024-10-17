import { City } from '@/features/city/domain/core/city';

export interface ICityRepository {
  findById(uuid: string): Promise<City | null>;
  findByDescription(description: string): Promise<City | null>;
  findByUf(uf: string): Promise<City[]>;
}
