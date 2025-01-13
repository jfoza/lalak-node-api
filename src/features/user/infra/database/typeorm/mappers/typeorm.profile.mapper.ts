import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';
import { ProfileEntity } from '@/features/user/infra/database/typeorm/entities/profile.entity';
import { Profile, ProfileProps } from '@/features/user/domain/entities/profile';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

export class TypeormProfileMapper extends Mapper<ProfileEntity, Profile> {
  static get toDomain(): TypeormProfileMapper {
    return new this();
  }

  async from(raw: ProfileEntity): Promise<Profile> {
    const props: ProfileProps = {
      description: raw.description,
      uniqueName: raw.unique_name,
      createdAt: raw.created_at,
    };

    return Profile.create(props, UniqueEntityId.create(raw.uuid));
  }
}
