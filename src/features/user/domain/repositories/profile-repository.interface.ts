import { Profile } from '@/features/user/domain/core/profile';

export interface IProfileRepository {
  findById(uuid: string): Promise<Profile | null>;
  findByUniqueName(uniqueName: string): Promise<Profile | null>;
}
