import { Mapper } from '@/common/infra/database/typeorm/Mapper';
import { Injectable } from '@nestjs/common';
import { AuthEntity } from '@/features/auth/infra/database/typeorm/entities/auth.entity';
import { Auth, AuthProps } from '@/features/auth/domain/core/Auth';

@Injectable()
export class AuthMapper extends Mapper<AuthEntity, Auth, AuthProps> {
  protected snakeCaseMapper: boolean = true;

  protected async toDomainEntity(
    props: AuthProps,
    uuid: string,
  ): Promise<Auth> {
    return Auth.create(props, uuid);
  }
}
