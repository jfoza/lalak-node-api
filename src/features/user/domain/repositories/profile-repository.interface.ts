import { Profile } from '@/features/user/domain/entities/profile';

export interface IProfileRepository {
  findById(uuid: string): Promise<Profile | null>;
  findByUniqueName(uniqueName: string): Promise<Profile | null>;
}

export const IProfileRepository = Symbol('IProfileRepository');
