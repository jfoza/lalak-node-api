import { Mapper } from '@/common/infra/database/typeorm/Mapper';
import { ProfileEntity } from '@/features/user/infra/database/typeorm/entities/profile.entity';
import { Profile, ProfileProps } from '@/features/user/domain/core/profile';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileMapper extends Mapper<
  ProfileEntity,
  Profile,
  ProfileProps
> {
  protected snakeCaseMapper: boolean = true;

  protected async toDomainEntity(
    props: ProfileProps,
    uuid: string,
  ): Promise<Profile> {
    return Profile.create(props, uuid);
  }
}
