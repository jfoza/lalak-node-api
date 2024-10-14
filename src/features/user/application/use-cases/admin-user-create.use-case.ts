import { IAdminUserCreateUseCase } from '@/features/user/domain/use-cases/admin-user-create.use-case.interface';
import { CreateAdminUserDto } from '@/features/user/application/dto/create-admin-user.dto';
import { User, UserProps } from '@/features/user/domain/core/user';
import { Inject, Injectable } from '@nestjs/common';
import { PolicyUseCase } from '@/common/application/use-cases/policy.use-case';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { UserValidations } from '@/features/user/application/validations/user.validations';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { Person, PersonProps } from '@/features/user/domain/core/person';
import { Helper } from 'src/common/infra/helpers';
import {
  AdminUser,
  AdminUserProps,
} from '@/features/user/domain/core/admin-user';
import { Hash } from '@/common/infra/utils/hash';
import { ProfileValidations } from '@/features/user/application/validations/profile.validations';
import { IProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';
import { IPersonRepository } from '@/features/user/domain/repositories/person-repository.interface';
import { Profile } from '@/features/user/domain/core/profile';
import { ProfileUniqueNameEnum } from '@/common/infra/enums/profile-unique-name.enum';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { IAdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository.interface';

@Injectable()
export class AdminUserCreateUseCase
  extends PolicyUseCase
  implements IAdminUserCreateUseCase
{
  private createAdminUserDto: CreateAdminUserDto;
  private profile: Profile;

  constructor(
    @Inject('IPersonRepository')
    private readonly personRepository: IPersonRepository,

    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    @Inject('IAdminUserRepository')
    private readonly adminUserRepository: IAdminUserRepository,

    @Inject('IProfileRepository')
    private readonly profileRepository: IProfileRepository,
  ) {
    super();
  }

  async execute(createAdminUserDto: CreateAdminUserDto): Promise<User> {
    this.createAdminUserDto = createAdminUserDto;

    switch (true) {
      case this.policy.haveRule(AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_INSERT):
        return this.createByAdminMaster();

      case this.policy.haveRule(AbilitiesEnum.ADMIN_USERS_EMPLOYEE_INSERT):
        return this.createByEmployee();

      default:
        this.policy.policyException();
    }
  }

  private async createByAdminMaster(): Promise<User> {
    await this.handleValidations();

    this.profileHierarchyValidation(
      this.profile.uniqueName,
      [ProfileUniqueNameEnum.ADMIN_MASTER, ProfileUniqueNameEnum.EMPLOYEE],
      ErrorMessagesEnum.PROFILE_NOT_ALLOWED,
    );

    return this.createAdminUser();
  }

  private async createByEmployee(): Promise<User> {
    await this.handleValidations();

    this.profileHierarchyValidation(
      this.profile.uniqueName,
      [ProfileUniqueNameEnum.EMPLOYEE],
      ErrorMessagesEnum.PROFILE_NOT_ALLOWED,
    );

    return this.createAdminUser();
  }

  private async handleValidations(): Promise<void> {
    await UserValidations.userAlreadyExistsByEmail(
      this.createAdminUserDto.email,
      this.userRepository,
    );

    this.profile = await ProfileValidations.profileExists(
      this.createAdminUserDto.profileUuid,
      this.profileRepository,
    );
  }

  private async createAdminUser(): Promise<User> {
    const person = await Person.createAndValidate({
      name: this.createAdminUserDto.name,
      shortName: Helper.shortStringGenerate(this.createAdminUserDto.name),
      active: true,
    } as PersonProps);

    const password = await Hash.createHash(this.createAdminUserDto.password);

    const user = await User.createAndValidate({
      personUuid: person.uuid,
      profileUuid: this.profile.uuid,
      email: this.createAdminUserDto.email,
      password,
      person,
      profile: this.profile,
      active: true,
    } as UserProps);

    const adminUser = await AdminUser.createAndValidate({
      userUuid: user.uuid,
    } as AdminUserProps);

    await this.personRepository.create(person);
    await this.userRepository.create(user);
    await this.adminUserRepository.create(adminUser);

    return user;
  }
}
