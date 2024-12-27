import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';
import { User, UserProps } from '@/features/user/domain/entities/user';
import { Inject, Injectable } from '@nestjs/common';
import { Profile } from '@/features/user/domain/entities/profile';
import { Person } from '@/features/user/domain/entities/person';
import { AdminUser } from '@/features/user/domain/entities/admin-user';
import { Customer } from '@/features/customer/domain/entities/customer';
import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';
import { ProfileMapper } from '@/features/user/infra/database/typeorm/mappers/profile.mapper';
import { PersonMapper } from '@/features/user/infra/database/typeorm/mappers/person.mapper';
import { AdminUserMapper } from '@/features/user/infra/database/typeorm/mappers/admin-user.mapper';
import { CustomerMapper } from '@/features/customer/infra/database/typeorm/mappers/customer.mapper';

@Injectable()
export class UserMapper extends Mapper<UserEntity, User> {
  constructor(
    @Inject(ProfileMapper)
    private readonly profileMapper: ProfileMapper,

    @Inject(PersonMapper)
    private readonly personMapper: PersonMapper,

    @Inject(AdminUserMapper)
    private readonly adminUserMapper: AdminUserMapper,

    @Inject(CustomerMapper)
    private readonly customerMapper: CustomerMapper,
  ) {
    super();
  }

  async from(ormEntity: UserEntity): Promise<User> {
    const profile: Profile = ormEntity.profile
      ? await this.profileMapper.from(ormEntity.profile)
      : null;
    const person: Person = ormEntity.person
      ? await this.personMapper.from(ormEntity.person)
      : null;
    const adminUser: AdminUser = ormEntity.admin_user
      ? await this.adminUserMapper.from(ormEntity.admin_user)
      : null;
    const customer: Customer = ormEntity.customer
      ? await this.customerMapper.from(ormEntity.customer)
      : null;

    const props: UserProps = {
      personUuid: ormEntity.person_uuid,
      profileUuid: ormEntity.profile_uuid,
      email: ormEntity.email,
      password: ormEntity.password,
      active: ormEntity.active,
      createdAt: ormEntity.created_at,
      profile,
      person,
      adminUser,
      customer,
    };

    return User.create(props, ormEntity.uuid);
  }
}
