import { IAdminUserCreateUseCase } from '@/features/user/domain/use-cases/admin-user-create.use-case.interface';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PersonAdminUserRepository } from '@/features/user/domain/repositories/person-admin-user.repository';
import { UserValidations } from '@/features/user/application/validations/user.validations';
import { ProfileValidations } from '@/features/user/application/validations/profile.validations';
import { Person, PersonProps } from '@/features/user/domain/entities/person';
import { PersonUserRepository } from '@/features/user/domain/repositories/person-user-repository';
import { ProfileUniqueNameEnum } from '@/utils/enums/profile-unique-name.enum';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { User, UserProps } from '@/features/user/domain/entities/user';
import { ShortName } from '@/common/domain/value-objects/short-name';
import { Name } from '@/common/domain/value-objects/name';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { Password } from '@/features/user/domain/value-objects/password';
import {
  AdminUser,
  AdminUserProps,
} from '@/features/user/domain/entities/admin-user';
import { IAdminUserCreateDto } from '@/features/user/domain/dto/admin-user-create.dto.interface';
import { Profile } from '@/features/user/domain/entities/profile';
import { ProfileRepository } from '@/features/user/domain/repositories/profile-repository';

@Injectable()
export class AdminUserCreateUseCase implements IAdminUserCreateUseCase {
  constructor(
    @Inject(PersonAdminUserRepository)
    private readonly personAdminUserRepository: PersonAdminUserRepository,

    @Inject(PersonUserRepository)
    private readonly personUserRepository: PersonUserRepository,

    @Inject(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  public async createUserForAdminMaster(
    createAdminUserDto: IAdminUserCreateDto,
  ): Promise<Person> {
    const { name, email, password, profileUuid } = createAdminUserDto;

    await UserValidations.userAlreadyExistsByEmail(
      email,
      this.personUserRepository,
    );

    await this.getProfileOrFail(
      createAdminUserDto.profileUuid,
      ProfileUniqueNameEnum.ADMIN_USERS,
    );

    return this.createAdminUser({ name, email, password, profileUuid });
  }

  public async createUserForEmployee(
    createAdminUserDto: IAdminUserCreateDto,
  ): Promise<Person> {
    const { name, email, password, profileUuid } = createAdminUserDto;

    await UserValidations.userAlreadyExistsByEmail(
      email,
      this.personUserRepository,
    );

    await this.getProfileOrFail(
      createAdminUserDto.profileUuid,
      ProfileUniqueNameEnum.EMPLOYEE_USERS,
    );

    return this.createAdminUser({ name, email, password, profileUuid });
  }

  private async getProfileOrFail(
    profileUuid: string,
    haystack: string[],
  ): Promise<Profile> {
    const profile = await ProfileValidations.profileExists(
      profileUuid,
      this.profileRepository,
    );

    if (!haystack.includes(profile.uniqueName)) {
      throw new ForbiddenException(ErrorMessagesEnum.PROFILE_NOT_ALLOWED);
    }

    return profile;
  }

  private async createAdminUser({
    name,
    email,
    password,
    profileUuid,
  }): Promise<Person> {
    const person: Person = Person.create({
      name: Name.createFrom(name),
      shortName: ShortName.createFrom(name),
      active: true,
    } as PersonProps);

    const user: User = User.create({
      email,
      active: true,
      password: await Password.createFrom(password),
      profileUuid: UniqueEntityId.create(profileUuid),
      personUuid: UniqueEntityId.create(person.uuid),
    } as UserProps);

    user.adminUser = AdminUser.create({
      userUuid: UniqueEntityId.create(user.uuid),
    } as AdminUserProps);

    person.user = user;

    await this.personAdminUserRepository.create(person);

    return person;
  }
}
