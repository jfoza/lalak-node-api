import { User, UserProps } from '@/features/user/domain/core/user';
import { Profile, ProfileProps } from '@/features/user/domain/core/profile';
import { ProfileUniqueNameEnum } from '@/common/infra/enums/profile-unique-name.enum';
import { Person, PersonProps } from '@/features/user/domain/core/person';
import { Hash } from '@/common/infra/utils/hash';
import {
  AdminUser,
  AdminUserProps,
} from '@/features/user/domain/core/admin-user';
import {
  Customer,
  CustomerProps,
} from '@/features/customer/domain/core/customer';
import { City, CityProps } from '@/features/city/domain/core/city';
import { UUID } from '@/common/infra/utils/uuid';
import { UserTokenProps } from '@/features/user/domain/core/user-token';
import { TokenTypesEnum } from '@/common/infra/enums/token-types.enum';

export class UserDataBuilder {
  static getUserTokenProps(): UserTokenProps {
    return {
      userUuid: UUID.generate(),
      token: UUID.generate(),
      tokenType: TokenTypesEnum.FORGOT_PASSWORD,
      createdAt: new Date(),
    };
  }

  static getAdminMasterProfileProps(): ProfileProps {
    return {
      description: 'Admin Master',
      uniqueName: ProfileUniqueNameEnum.ADMIN_MASTER,
    };
  }

  static getCustomerProfileProps(): ProfileProps {
    return {
      description: 'Customer',
      uniqueName: ProfileUniqueNameEnum.CUSTOMER,
    };
  }

  static getPersonProps(): PersonProps {
    return {
      name: 'Test',
      shortName: 'TE',
      birthDate: '1995-04-19',
      phone: '5199999999',
      zipCode: '99999999',
      address: 'test',
      numberAddress: '00',
      complement: 'test',
      district: 'test',
      uf: 'RS',
      cityUuid: UUID.generate(),
      active: true,
      createdAt: new Date(),
      city: new City({
        description: 'test',
        uf: 'RS',
      } as CityProps),
    };
  }

  static getAdminMasterProfile(): Profile {
    return new Profile(this.getAdminMasterProfileProps());
  }

  static getCustomerProfile(): Profile {
    return new Profile(this.getCustomerProfileProps());
  }

  static getPerson(): Person {
    return new Person(this.getPersonProps());
  }

  static async getUserProps(profile: Profile = null): Promise<UserProps> {
    const profileAux = !profile ? this.getAdminMasterProfile() : profile;
    const person = this.getPerson();

    return {
      personUuid: UUID.generate(),
      profileUuid: UUID.generate(),
      email: 'test@email.com',
      password: await Hash.createHash('pass'),
      active: true,
      createdAt: new Date(),
      profile: profileAux,
      person,
    };
  }

  static getAdminUser(): AdminUser {
    return new AdminUser({
      userUuid: UUID.generate(),
    } as AdminUserProps);
  }

  static getCustomer(): Customer {
    return new Customer({
      userUuid: UUID.generate(),
      verifiedEmail: true,
    } as CustomerProps);
  }

  static async getUserAdminType(): Promise<User> {
    const user = new User(await this.getUserProps());

    user.props.adminUser = new AdminUser({
      userUuid: user.uuid,
    } as AdminUserProps);

    return user;
  }

  static async getUserCustomer(): Promise<User> {
    const user = new User(await this.getUserProps());

    user.props.customer = new Customer({
      userUuid: user.uuid,
      verifiedEmail: true,
    } as CustomerProps);

    return user;
  }
}
