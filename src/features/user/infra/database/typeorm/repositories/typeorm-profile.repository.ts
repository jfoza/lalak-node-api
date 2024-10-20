import { IProfileRepository } from '@/features/user/domain/repositories/profile-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '@/features/user/infra/database/typeorm/entities/profile.entity';
import { Profile } from '@/features/user/domain/core/profile';
import { ProfileMapper } from '@/features/user/infra/database/typeorm/mappers/profile.mapper';
import { Inject } from '@nestjs/common';

export class TypeormProfileRepository implements IProfileRepository {
  @InjectRepository(ProfileEntity)
  private readonly profileEntityRepository: Repository<ProfileEntity>;

  @Inject(ProfileMapper)
  private readonly profileMapper: ProfileMapper;

  async findById(uuid: string): Promise<Profile | null> {
    const result = await this.profileEntityRepository.findOne({
      where: { uuid },
    });

    return this.profileMapper.optional(result);
  }

  async findByUniqueName(uniqueName: string): Promise<Profile | null> {
    const result = await this.profileEntityRepository.findOne({
      where: { unique_name: uniqueName },
    });

    return this.profileMapper.optional(result);
  }
}
