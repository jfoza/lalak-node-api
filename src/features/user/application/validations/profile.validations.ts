import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { IProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';
import { Profile } from '@/features/user/domain/core/profile';

export class ProfileValidations {
  static async profileExists(
    uuid: string,
    profileRepository: IProfileRepository,
  ): Promise<Profile> {
    const profile = await profileRepository.findById(uuid);

    if (!profile) {
      throw new NotFoundException(ErrorMessagesEnum.PROFILE_NOT_FOUND);
    }

    return profile;
  }
}
