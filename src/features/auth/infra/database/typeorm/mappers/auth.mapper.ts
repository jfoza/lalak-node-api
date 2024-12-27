import { Injectable } from '@nestjs/common';
import { AuthEntity } from '@/features/auth/infra/database/typeorm/entities/auth.entity';
import { Auth, AuthProps } from '@/features/auth/domain/entities/auth';
import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';

@Injectable()
export class AuthMapper extends Mapper<AuthEntity, Auth> {
  async from(ormEntity: AuthEntity): Promise<Auth> {
    const props: AuthProps = {
      userUuid: ormEntity.user_uuid,
      initialDate: ormEntity.initial_date,
      finalDate: ormEntity.final_date,
      token: ormEntity.token,
      ipAddress: ormEntity.ip_address,
      authType: ormEntity.auth_type,
      active: ormEntity.active,
      createdAt: ormEntity.created_at,
    };

    return Auth.create(props, ormEntity.uuid);
  }
}
