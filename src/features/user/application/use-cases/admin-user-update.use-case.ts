import { IAdminUserUpdateUseCase } from '@/features/user/domain/use-cases/admin-user-update.use-case.interface';
import { UpdateAdminUserDto } from '@/features/user/application/dto/update-admin-user.dto';
import { User } from '@/features/user/domain/core/user';
import { Inject, Injectable } from '@nestjs/common';
import { IPersonRepository } from '@/features/user/domain/repositories/person-repository.interface';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { IAdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository.interface';
import { IProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';
import { PolicyUseCase } from '@/common/application/use-cases/policy.use-case';
import { AbilitiesEnum } from '@/common/infra/enums/abilities.enum';
import { UserValidations } from '@/features/user/application/validations/user.validations';
import { ProfileValidations } from '@/features/user/application/validations/profile.validations';
import { AdminUserValidations } from '@/features/user/application/validations/admin-user.validations';
import { ProfileUniqueNameEnum } from '@/common/infra/enums/profile-unique-name.enum';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { Profile } from '@/features/user/domain/core/profile';
import { Helper } from 'src/common/infra/helpers';
import { Hash } from '@/common/infra/utils/hash';

@Injectable()
export class AdminUserUpdateUseCase
  extends PolicyUseCase
  implements IAdminUserUpdateUseCase
{
  private userPayload: User;
  private profilePayload: Profile;
  private uuid: string;
  private updateAdminUserDto: UpdateAdminUserDto;

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

  async execute(
    uuid: string,
    updateAdminUserDto: UpdateAdminUserDto,
  ): Promise<User> {
    this.uuid = uuid;
    this.updateAdminUserDto = updateAdminUserDto;

    switch (true) {
      case this.policy.has(AbilitiesEnum.ADMIN_USERS_ADMIN_MASTER_UPDATE):
        return await this.updateByAdminMaster();

      case this.policy.has(AbilitiesEnum.ADMIN_USERS_EMPLOYEE_UPDATE):
        return await this.updateByEmployee();

      default:
        this.policy.policyException();
    }
  }

  private async updateByAdminMaster(): Promise<User> {
    await this.handleValidations();

    this.profileHierarchyValidation(
      this.userPayload.profile.uniqueName,
      ProfileUniqueNameEnum.PROFILES_BY_ADMIN_MASTER_USERS,
      ErrorMessagesEnum.USER_NOT_ALLOWED,
    );

    this.profileHierarchyValidation(
      this.profilePayload.uniqueName,
      ProfileUniqueNameEnum.PROFILES_BY_ADMIN_MASTER_USERS,
      ErrorMessagesEnum.PROFILE_NOT_ALLOWED,
    );

    return await this.updateAdminUser();
  }

  private async updateByEmployee(): Promise<User> {
    await this.handleValidations();

    this.profileHierarchyValidation(
      this.userPayload.profile.uniqueName,
      ProfileUniqueNameEnum.PROFILES_BY_EMPLOYEE_USERS,
      ErrorMessagesEnum.USER_NOT_ALLOWED,
    );

    this.profileHierarchyValidation(
      this.profilePayload.uniqueName,
      ProfileUniqueNameEnum.PROFILES_BY_EMPLOYEE_USERS,
      ErrorMessagesEnum.PROFILE_NOT_ALLOWED,
    );

    return await this.updateAdminUser();
  }

  private async handleValidations(): Promise<void> {
    this.userPayload = await AdminUserValidations.adminUserExistsByUserUuid(
      this.uuid,
      this.adminUserRepository,
    );

    await UserValidations.userAlreadyExistsByEmailInUpdate(
      this.uuid,
      this.updateAdminUserDto.email,
      this.userRepository,
    );

    this.profilePayload = await ProfileValidations.profileExists(
      this.updateAdminUserDto.profileUuid,
      this.profileRepository,
    );
  }

  private async updateAdminUser(): Promise<User> {
    this.userPayload.person.name = this.updateAdminUserDto.name;
    this.userPayload.person.shortName = Helper.shortStringGenerate(
      this.updateAdminUserDto.name,
    );

    this.userPayload.email = this.updateAdminUserDto.email;
    this.userPayload.profileUuid = this.profilePayload.uuid;
    this.userPayload.profile = this.profilePayload;

    await this.personRepository.update(this.userPayload.person);
    await this.userRepository.update(this.userPayload);

    if (this.updateAdminUserDto.password) {
      const password = await Hash.createHash(this.updateAdminUserDto.password);

      await this.userRepository.updatePassword(this.userPayload.uuid, password);
    }

    return this.userPayload;
  }
}
