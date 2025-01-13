import { IAdminUserUpdateUseCase } from '@/features/user/domain/use-cases/admin-user-update.use-case.interface';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { IAdminUserUpdateDto } from '@/features/user/domain/dto/admin-user-update.dto.interface';
import { AdminUserValidations } from '@/features/user/application/validations/admin-user.validations';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { AdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository';
import { ProfileUniqueNameEnum } from '@/utils/enums/profile-unique-name.enum';
import { UserValidations } from '@/features/user/application/validations/user.validations';
import { UserRepository } from '@/features/user/domain/repositories/user-repository';
import { ProfileValidations } from '@/features/user/application/validations/profile.validations';
import { ShortName } from '@/common/domain/value-objects/short-name';
import { Name } from '@/common/domain/value-objects/name';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { Profile } from '@/features/user/domain/entities/profile';
import { ProfileRepository } from '@/features/user/domain/repositories/profile-repository';
import { User } from '@/features/user/domain/entities/user';

type TDataBuilder = {
  uuid: string;
  user: User;
  profile: Profile;
  updateAdminUserDto: IAdminUserUpdateDto;
};

@Injectable()
export class AdminUserUpdateUseCase implements IAdminUserUpdateUseCase {
  constructor(
    @Inject(AdminUserRepository)
    private readonly personAdminUserRepository: AdminUserRepository,

    @Inject(UserRepository)
    private readonly userRepository: UserRepository,

    @Inject(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async updateUserForAdminMaster(
    uuid: string,
    updateAdminUserDto: IAdminUserUpdateDto,
  ): Promise<User> {
    const user = await this.getUserOrFail(
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
      user,
      profile,
    };

    return await this.update(dataBuilder);
  }

  async updateUserForEmployee(
    uuid: string,
    updateAdminUserDto: IAdminUserUpdateDto,
  ): Promise<User> {
    const user = await this.getUserOrFail(
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
      user,
      profile,
    };

    return await this.update(dataBuilder);
  }

  private async getUserOrFail(uuid: string, haystack: string[]): Promise<User> {
    const user = await AdminUserValidations.adminUserExistsByUserUuid(
      uuid,
      this.personAdminUserRepository,
    );

    await UserValidations.userAlreadyExistsByEmailInUpdate(
      uuid,
      user.email,
      this.userRepository,
    );

    if (!haystack.includes(user.profile.uniqueName)) {
      throw new ForbiddenException(ErrorMessagesEnum.USER_NOT_ALLOWED);
    }

    return user;
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

  private async update(dataBuilder: TDataBuilder): Promise<User> {
    const { user, updateAdminUserDto } = dataBuilder;

    user.person.name = Name.createFrom(updateAdminUserDto.name);
    user.person.shortName = ShortName.createFrom(updateAdminUserDto.name);

    user.email = updateAdminUserDto.email;
    user.profileUuid = UniqueEntityId.create(updateAdminUserDto.profileUuid);

    await this.personAdminUserRepository.update(user);

    return user;
  }
}
