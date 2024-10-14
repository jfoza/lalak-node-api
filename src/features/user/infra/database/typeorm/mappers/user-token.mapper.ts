import { Mapper } from '@/common/infra/database/typeorm/Mapper';
import {
  UserToken,
  UserTokenProps,
} from '@/features/user/domain/core/user-token';
import { UserTokenEntity } from '@/features/user/infra/database/typeorm/entities/user-token.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserTokenMapper extends Mapper<
  UserTokenEntity,
  UserToken,
  UserTokenProps
> {
  protected snakeCaseMapper: boolean = true;

  protected async toDomainEntity(
    props: UserTokenProps,
    uuid: string,
  ): Promise<UserToken> {
    return UserToken.create(props, uuid);
  }
}
