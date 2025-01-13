import { IAdminUserCreateUseCase } from '@/features/user/domain/use-cases/admin-user-create.use-case.interface';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { AdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository';
import { UserValidations } from '@/features/user/application/validations/user.validations';
import { ProfileValidations } from '@/features/user/application/validations/profile.validations';
import { UserRepository } from '@/features/user/domain/repositories/user-repository';
import { ProfileUniqueNameEnum } from '@/utils/enums/profile-unique-name.enum';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { ShortName } from '@/common/domain/value-objects/short-name';
import { Name } from '@/common/domain/value-objects/name';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { Password } from '@/features/user/domain/value-objects/password';
import { IAdminUserCreateDto } from '@/features/user/domain/dto/admin-user-create.dto.interface';
import { Profile } from '@/features/user/domain/entities/profile';
import { ProfileRepository } from '@/features/user/domain/repositories/profile-repository';
import { User, UserProps } from '@/features/user/domain/entities/user';
import { Person, PersonProps } from '@/features/user/domain/entities/person';

@Injectable()
export class AdminUserCreateUseCase implements IAdminUserCreateUseCase {
  constructor(
    @Inject(AdminUserRepository)
    private readonly personAdminUserRepository: AdminUserRepository,

    @Inject(UserRepository)
    private readonly userRepository: UserRepository,

    @Inject(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  public async createUserForAdminMaster(
    createAdminUserDto: IAdminUserCreateDto,
  ): Promise<User> {
    const { name, email, password, profileUuid } = createAdminUserDto;

    await UserValidations.userAlreadyExistsByEmail(email, this.userRepository);

    await this.getProfileOrFail(
      createAdminUserDto.profileUuid,
      ProfileUniqueNameEnum.ADMIN_USERS,
    );

    return this.createAdminUser({ name, email, password, profileUuid });
  }

  public async createUserForEmployee(
    createAdminUserDto: IAdminUserCreateDto,
  ): Promise<User> {
    const { name, email, password, profileUuid } = createAdminUserDto;

    await UserValidations.userAlreadyExistsByEmail(email, this.userRepository);

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
  }): Promise<User> {
    const person = Person.create({
      name: Name.createFrom(name),
      shortName: ShortName.createFrom(name),
      active: true,
    } as PersonProps);

    const user = User.create({
      personUuid: UniqueEntityId.create(person.uuid),
      profileUuid: UniqueEntityId.create(profileUuid),
      email,
      password: await Password.createFrom(password),
      active: true,
    } as UserProps);

    await this.personAdminUserRepository.create(user);

    return user;
  }
}
