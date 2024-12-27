import {
  UserToken,
  UserTokenProps,
} from '@/features/user/domain/entities/user-token';
import { UserTokenEntity } from '@/features/user/infra/database/typeorm/entities/user-token.entity';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';

@Injectable()
export class UserTokenMapper extends Mapper<UserTokenEntity, UserToken> {
  async from(ormEntity: UserTokenEntity): Promise<UserToken> {
    const props: UserTokenProps = {
      userUuid: ormEntity.user_uuid,
      token: ormEntity.token,
      tokenType: ormEntity.token_type,
      createdAt: ormEntity.created_at,
    };

    return UserToken.create(props, ormEntity.uuid);
  }
}
