import { Mapper } from '@/common/infra/database/typeorm/mappers/Mapper';
import { AdminUserEntity } from '@/features/user/infra/database/typeorm/entities/admin-user.entity';
import {
  AdminUser,
  AdminUserProps,
} from '@/features/user/domain/core/admin-user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminUserMapper extends Mapper<
  AdminUserEntity,
  AdminUser,
  AdminUserProps
> {
  protected snakeCaseMapper: boolean = true;

  protected async toDomainEntity(
    props: AdminUserProps,
    uuid: string,
  ): Promise<AdminUser> {
    return AdminUser.create(props, uuid);
  }
}
