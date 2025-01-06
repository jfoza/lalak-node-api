import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { Profile } from '@/features/user/domain/entities/profile';
import { ProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';

export class ProfileValidations {
  static async profileExists(
    uuid: string,
    profileRepository: ProfileRepository,
  ): Promise<Profile> {
    const profile = await profileRepository.findByUuid(uuid);

    if (!profile) {
      throw new NotFoundException(ErrorMessagesEnum.PROFILE_NOT_FOUND);
    }

    return profile;
  }
}
