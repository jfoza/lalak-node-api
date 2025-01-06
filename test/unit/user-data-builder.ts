import { User, UserProps } from '@/features/user/domain/entities/user';
import { Profile, ProfileProps } from '@/features/user/domain/entities/profile';
import { ProfileUniqueNameEnum } from '@/utils/enums/profile-unique-name.enum';
import { Person, PersonProps } from '@/features/user/domain/entities/person';
import {
  AdminUser,
  AdminUserProps,
} from '@/features/user/domain/entities/admin-user';
import {
  Customer,
  CustomerProps,
} from '@/features/user/domain/entities/customer';
import { City, CityProps } from '@/features/city/domain/entities/city';
import { UserTokenProps } from '@/features/user/domain/entities/user-token';
import { TokenTypesEnum } from '@/utils/enums/token-types.enum';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { UserTokenType } from '@/features/user/domain/value-objects/user-token-type';
import { Name } from '@/common/domain/value-objects/name';
import { ShortName } from '@/common/domain/value-objects/short-name';
import { BirthDate } from '@/common/domain/value-objects/birth-date';
import { Phone } from '@/common/domain/value-objects/phone';
import { ZipCode } from '@/common/domain/value-objects/zip-code';
import { Address } from '@/common/domain/value-objects/address';
import { Uf } from '@/common/domain/value-objects/uf';
import { BrazilianStates } from '@/utils/enums/brazilian-states.enum';
import { Password } from '@/features/user/domain/value-objects/password';
import {
  PersonAuthUser,
  PersonAuthUserProps,
} from '@/features/user/domain/entities/person-auth-user';

export class UserDataBuilder {
  static getUserTokenProps(): UserTokenProps {
    return {
      userUuid: UniqueEntityId.create(),
      token: UniqueEntityId.create(),
      tokenType: UserTokenType.create(TokenTypesEnum.FORGOT_PASSWORD),
      createdAt: new Date(),
    };
  }

  static getAdminMasterProfileProps(): ProfileProps {
    return {
      description: 'Admin Master',
      uniqueName: ProfileUniqueNameEnum.ADMIN_MASTER,
    };
  }

  static getEmployeeProfileProps(): ProfileProps {
    return {
      description: 'Employee',
      uniqueName: ProfileUniqueNameEnum.EMPLOYEE,
    };
  }

  static getCustomerProfileProps(): ProfileProps {
    return {
      description: 'Customer',
      uniqueName: ProfileUniqueNameEnum.CUSTOMER,
    };
  }

  static async getPersonProps(profile: Profile = null): Promise<PersonProps> {
    return {
      name: Name.createFrom('Test'),
      shortName: ShortName.createFrom('Test'),
      birthDate: BirthDate.createFrom(new Date()),
      phone: Phone.createFrom('(51) 99999-9999'),
      zipCode: ZipCode.createFrom('99999-999'),
      address: Address.createFrom('test'),
      numberAddress: '00',
      complement: 'test',
      district: 'test',
      uf: Uf.create(BrazilianStates.RJ),
      cityUuid: UniqueEntityId.create(),
      active: true,
      createdAt: new Date(),
      city: new City({
        description: 'test',
        uf: Uf.create(BrazilianStates.RJ),
      } as CityProps),
      user: await this.getUser(profile),
    };
  }

  static async getPersonAdminMaster() {
    return new Person(await this.getPersonProps(this.getAdminMasterProfile()));
  }

  static async getPersonEmployee() {
    return new Person(await this.getPersonProps(this.getEmployeeProfile()));
  }

  static async getPersonCustomer() {
    return new Person(await this.getPersonProps(this.getCustomerProfile()));
  }

  static getAdminMasterProfile(): Profile {
    return new Profile(this.getAdminMasterProfileProps());
  }

  static getEmployeeProfile(): Profile {
    return new Profile(this.getEmployeeProfileProps());
  }

  static getCustomerProfile(): Profile {
    return new Profile(this.getCustomerProfileProps());
  }

  static async getPerson(): Promise<Person> {
    return new Person(await this.getPersonProps());
  }

  static async getUserProps(profile: Profile = null): Promise<UserProps> {
    const profileAux = !profile ? this.getAdminMasterProfile() : profile;

    return {
      personUuid: UniqueEntityId.create(),
      profileUuid: UniqueEntityId.create(),
      email: 'test@email.com',
      password: await Password.createFrom('pass'),
      active: true,
      createdAt: new Date(),
      profile: profileAux,
    };
  }

  static async getUser(profile: Profile = null): Promise<User> {
    return new User(await this.getUserProps(profile));
  }

  static getAdminUser(): AdminUser {
    return new AdminUser({
      userUuid: UniqueEntityId.create(),
    } as AdminUserProps);
  }

  static getCustomer(): Customer {
    return new Customer({
      userUuid: UniqueEntityId.create(),
      verifiedEmail: true,
    } as CustomerProps);
  }

  static async getUserAdminType(): Promise<User> {
    const user = new User(await this.getUserProps());

    user.props.adminUser = new AdminUser({
      userUuid: UniqueEntityId.create(user.uuid),
    } as AdminUserProps);

    return user;
  }

  static async getUserCustomer(): Promise<User> {
    const user = new User(await this.getUserProps());

    user.props.customer = new Customer({
      userUuid: UniqueEntityId.create(user.uuid),
      verifiedEmail: true,
    } as CustomerProps);

    return user;
  }

  static async getPersonAuthUserProps(): Promise<PersonAuthUserProps> {
    return {
      name: Name.createFrom('Test'),
      email: 'test@email.com',
      password: await Password.createFrom('pass'),
      shortName: ShortName.createFrom('Test'),
      birthDate: BirthDate.createFrom(new Date()),
      phone: Phone.createFrom('(51) 99999-9999'),
      zipCode: ZipCode.createFrom('99999-999'),
      address: Address.createFrom('test'),
      numberAddress: '00',
      complement: 'test',
      district: 'test',
      uf: Uf.create(BrazilianStates.RJ),
      active: true,
      createdAt: new Date(),
      city: new City({
        description: 'test',
        uf: Uf.create(BrazilianStates.RJ),
      } as CityProps),
      profile: this.getAdminMasterProfile(),
      abilities: [],
    } as PersonAuthUserProps;
  }

  static async getPersonAuthUser(): Promise<PersonAuthUser> {
    const props: PersonAuthUserProps = await this.getPersonAuthUserProps();

    return PersonAuthUser.create(props);
  }
}
