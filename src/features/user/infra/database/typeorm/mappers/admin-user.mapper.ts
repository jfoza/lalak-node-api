import { AdminUserEntity } from '@/features/user/infra/database/typeorm/entities/admin-user.entity';
import {
  AdminUser,
  AdminUserProps,
} from '@/features/user/domain/entities/admin-user';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';

@Injectable()
export class AdminUserMapper extends Mapper<AdminUserEntity, AdminUser> {
  async from(ormEntity: AdminUserEntity): Promise<AdminUser> {
    const props: AdminUserProps = {
      userUuid: ormEntity.uuid,
      createdAt: ormEntity.created_at,
    };

    return AdminUser.create(props, ormEntity.uuid);
  }
}
