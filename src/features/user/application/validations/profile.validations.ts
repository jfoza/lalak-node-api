import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { IProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';
import { Profile } from '@/features/user/domain/entities/profile';

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
