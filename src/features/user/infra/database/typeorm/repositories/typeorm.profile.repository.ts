import { Profile } from '@/features/user/domain/entities/profile';
import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '@/features/user/domain/repositories/profile-repository';

@Injectable()
export class TypeormProfileRepository implements ProfileRepository {
  findByUniqueName(uniqueName: string): Promise<Profile | null> {
    return Promise.resolve(undefined);
  }

  findByUuid(uuid: string): Promise<Profile | null> {
    return Promise.resolve(undefined);
  }
}
