import { Inject, Injectable } from '@nestjs/common';
import { User } from '@/features/user/domain/core/user';
import { Repository } from 'typeorm';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { UserMapper } from '@/features/user/infra/database/typeorm/mappers/user.mapper';

@Injectable()
export class TypeormUserRepository implements IUserRepository {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  @Inject(UserMapper)
  private readonly userMapper: UserMapper;

  async create(user: User): Promise<User> {
    const userEntity: UserEntity = this.userRepository.create({
      uuid: user.uuid,
      person_uuid: user.personUuid,
      profile_uuid: user.profileUuid,
      email: user.email,
      password: user.password,
      created_at: user.createdAt,
    });

    await this.userRepository.save(userEntity);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.userRepository.findOne({
      where: { email },
      relations: ['person'],
    });

    return this.userMapper.optional(result);
  }

  async findByEmailInLogin(email: string): Promise<User | null> {
    const result = await this.userRepository.findOne({
      where: { email },
      relations: ['admin_user', 'person', 'profile'],
    });

    return this.userMapper.optional(result);
  }

  async findByUuid(uuid: string): Promise<User | null> {
    const result = await this.userRepository.findOne({
      where: { uuid },
      relations: ['person', 'admin_user', 'profile'],
    });

    return this.userMapper.optional(result);
  }

  async findByUserLoggedByUuid(
    uuid: string,
    relation: string,
  ): Promise<User | null> {
    const result = await this.userRepository.findOne({
      where: { uuid },
      relations: ['person', 'admin_user', 'profile', relation],
    });

    return this.userMapper.optional(result);
  }

  async update(user: User): Promise<User> {
    await this.userRepository.update(user.uuid, {
      profile_uuid: user.profileUuid,
      email: user.email,
    });

    return user;
  }

  async updatePassword(uuid: string, newPassword: string): Promise<void> {
    await this.userRepository.update(uuid, {
      password: newPassword,
    });
  }

  async updateStatus(uuid: string, newStatus: boolean): Promise<void> {
    await this.userRepository.update(uuid, {
      active: newStatus,
    });
  }
}
