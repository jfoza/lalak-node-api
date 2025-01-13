import { AdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository';
import { IAdminUserSearchParamsDto } from '@/features/user/domain/dto/admin-user-search-params.dto.interface';
import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeormUserMapper } from '@/features/user/infra/database/typeorm/mappers/typeorm.user.mapper';
import { User } from '@/features/user/domain/entities/user';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';

@Injectable()
export class TypeormAdminUserRepository implements AdminUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async findAll(
    adminUserSearchParamsDto: IAdminUserSearchParamsDto,
  ): Promise<User[]> {
    const result = await this.getBaseQuery().getMany();

    return TypeormUserMapper.toDomain.collection(result);
  }

  async findByUuid(uuid: string): Promise<User> {
    const result = await this.getBaseQuery()
      .where('user.uuid = :uuid', { uuid })
      .getOne();

    return TypeormUserMapper.toDomain.optional(result);
  }

  async findOneForLogin(email: string): Promise<User> {
    const result = await this.getBaseQuery()
      .where('user.email = :email', { email })
      .getOne();

    return TypeormUserMapper.toDomain.optional(result);
  }

  create(user: User): Promise<User> {
    return Promise.resolve(undefined);
  }

  update(user: User): Promise<User> {
    return Promise.resolve(undefined);
  }

  private getBaseQuery(): SelectQueryBuilder<UserEntity> {
    return this.userEntityRepository
      .createQueryBuilder('user')
      .innerJoin('user.admin_user', 'admin_user')
      .innerJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('user.profile', 'profile');
  }
}
