import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';
import { User, UserProps } from '@/features/user/domain/core/user';
import { Mapper } from '@/common/infra/database/typeorm/mappers/Mapper';
import { Injectable } from '@nestjs/common';
import { Profile } from '@/features/user/domain/core/profile';
import { Person } from '@/features/user/domain/core/person';
import { AdminUser } from '@/features/user/domain/core/admin-user';
import { Customer } from '@/features/customer/domain/core/customer';

@Injectable()
export class UserMapper extends Mapper<UserEntity, User, UserProps> {
  protected snakeCaseMapper: boolean = true;

  protected async toDomainEntity(
    props: UserProps,
    uuid: string,
  ): Promise<User> {
    props.profile = props.profile
      ? await Profile.create(props.profile, props.profile.uuid)
      : null;

    props.person = props.person
      ? await Person.create(props.person, props.person.uuid)
      : null;

    props.adminUser = props.adminUser
      ? await AdminUser.create(props.adminUser, props.adminUser.uuid)
      : null;

    props.customer = props.customer
      ? await Customer.create(props.customer, props.customer.uuid)
      : null;

    return User.create(props, uuid);
  }
}
