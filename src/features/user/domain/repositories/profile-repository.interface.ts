import { Profile } from '@/features/user/domain/entities/profile';

export interface ProfileRepository {
  findByUuid(uuid: string): Promise<Profile | null>;
  findByUniqueName(uniqueName: string): Promise<Profile | null>;
}

export const ProfileRepository = Symbol('ProfileRepository');
