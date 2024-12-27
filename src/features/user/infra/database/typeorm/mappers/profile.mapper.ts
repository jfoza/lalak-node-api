import { ProfileEntity } from '@/features/user/infra/database/typeorm/entities/profile.entity';
import { Profile, ProfileProps } from '@/features/user/domain/entities/profile';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';

@Injectable()
export class ProfileMapper extends Mapper<ProfileEntity, Profile> {
  async from(ormEntity: ProfileEntity): Promise<Profile> {
    const props: ProfileProps = {
      description: ormEntity.description,
      uniqueName: ormEntity.unique_name,
      createdAt: ormEntity.created_at,
    };

    return Profile.create(props, ormEntity.uuid);
  }
}
