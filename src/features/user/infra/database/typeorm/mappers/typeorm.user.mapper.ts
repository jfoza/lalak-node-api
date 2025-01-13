import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { Name } from '@/common/domain/value-objects/name';
import { ShortName } from '@/common/domain/value-objects/short-name';
import { Password } from '@/features/user/domain/value-objects/password';
import { User, UserProps } from '@/features/user/domain/entities/user';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';
import { Person, PersonProps } from '@/features/user/domain/entities/person';
import { Profile, ProfileProps } from '@/features/user/domain/entities/profile';

export class TypeormUserMapper extends Mapper<UserEntity, User> {
  static get toDomain(): TypeormUserMapper {
    return new this();
  }

  async from(raw: UserEntity): Promise<User> {
    const person = Person.create(
      {
        name: Name.createFrom(raw.person.name),
        shortName: ShortName.createFrom(raw.person.short_name),
        active: true,
      } as PersonProps,
      UniqueEntityId.create(raw.person.uuid),
    );

    const profile = Profile.create(
      {
        description: raw.profile.description,
        uniqueName: raw.profile.unique_name,
        createdAt: raw.profile.created_at,
      } as ProfileProps,
      UniqueEntityId.create(raw.profile.uuid),
    );

    const props: UserProps = {
      personUuid: UniqueEntityId.create(raw.person.uuid),
      profileUuid: UniqueEntityId.create(raw.profile_uuid),
      email: raw.email,
      password: Password.create(raw.password),
      active: true,
      person,
      profile,
    };

    return User.create(props, UniqueEntityId.create(raw.uuid));
  }
}
