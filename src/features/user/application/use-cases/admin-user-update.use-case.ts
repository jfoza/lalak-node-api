import { IAdminUserUpdateUseCase } from '@/features/user/domain/use-cases/admin-user-update.use-case.interface';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { IAdminUserUpdateDto } from '@/features/user/domain/dto/admin-user-update.dto.interface';
import { Person } from '@/features/user/domain/entities/person';
import { AdminUserValidations } from '@/features/user/application/validations/admin-user.validations';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { PersonAdminUserRepository } from '@/features/user/domain/repositories/person-admin-user.repository';
import { ProfileUniqueNameEnum } from '@/utils/enums/profile-unique-name.enum';
import { UserValidations } from '@/features/user/application/validations/user.validations';
import { PersonUserRepository } from '@/features/user/domain/repositories/person-user-repository';
import { ProfileValidations } from '@/features/user/application/validations/profile.validations';
import { ShortName } from '@/common/domain/value-objects/short-name';
import { Name } from '@/common/domain/value-objects/name';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { Profile } from '@/features/user/domain/entities/profile';
import { ProfileRepository } from '@/features/user/domain/repositories/profile-repository';

type TDataBuilder = {
  uuid: string;
  person: Person;
  profile: Profile;
  updateAdminUserDto: IAdminUserUpdateDto;
};

@Injectable()
export class AdminUserUpdateUseCase implements IAdminUserUpdateUseCase {
  constructor(
    @Inject(PersonAdminUserRepository)
    private readonly personAdminUserRepository: PersonAdminUserRepository,

    @Inject(PersonUserRepository)
    private readonly personUserRepository: PersonUserRepository,

    @Inject(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async updateUserForAdminMaster(
    uuid: string,
    updateAdminUserDto: IAdminUserUpdateDto,
  ): Promise<Person> {
    const person = await this.getUserOrFail(
      uuid,
      ProfileUniqueNameEnum.ADMIN_USERS,
    );

    const profile = await this.getProfileOrFail(
      updateAdminUserDto.profileUuid,
      ProfileUniqueNameEnum.ADMIN_USERS,
    );

    const dataBuilder: TDataBuilder = {
      uuid,
      updateAdminUserDto,
      person,
      profile,
    };

    return await this.update(dataBuilder);
  }

  async updateUserForEmployee(
    uuid: string,
    updateAdminUserDto: IAdminUserUpdateDto,
  ): Promise<Person> {
    const person = await this.getUserOrFail(
      uuid,
      ProfileUniqueNameEnum.EMPLOYEE_USERS,
    );

    const profile = await this.getProfileOrFail(
      updateAdminUserDto.profileUuid,
      ProfileUniqueNameEnum.EMPLOYEE_USERS,
    );

    const dataBuilder: TDataBuilder = {
      uuid,
      updateAdminUserDto,
      person,
      profile,
    };

    return await this.update(dataBuilder);
  }

  private async getUserOrFail(
    uuid: string,
    haystack: string[],
  ): Promise<Person> {
    const person = await AdminUserValidations.adminUserExistsByUserUuid(
      uuid,
      this.personAdminUserRepository,
    );

    const { user } = person;

    await UserValidations.userAlreadyExistsByEmailInUpdate(
      uuid,
      user.email,
      this.personUserRepository,
    );

    if (!haystack.includes(user.profile.uniqueName)) {
      throw new ForbiddenException(ErrorMessagesEnum.USER_NOT_ALLOWED);
    }

    return person;
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

  private async update(dataBuilder: TDataBuilder): Promise<Person> {
    const { person, updateAdminUserDto } = dataBuilder;

    person.name = Name.createFrom(updateAdminUserDto.name);
    person.shortName = ShortName.createFrom(updateAdminUserDto.name);

    person.user.email = updateAdminUserDto.email;
    person.user.profileUuid = UniqueEntityId.create(
      updateAdminUserDto.profileUuid,
    );

    await this.personAdminUserRepository.update(person);

    return person;
  }
}
