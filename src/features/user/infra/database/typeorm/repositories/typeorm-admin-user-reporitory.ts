import { User } from '@/features/user/domain/core/user';
import { AdminUserEntity } from '@/features/user/infra/database/typeorm/entities/admin-user.entity';
import { UserEntity } from '@/features/user/infra/database/typeorm/entities/user.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { AdminUserSearchParamsDto } from '@/features/user/application/dto/admin-user-search-params.dto';
import { toPaginate } from '@/common/infra/database/typeorm/pagination';
import { Inject, Injectable } from '@nestjs/common';
import { AdminUser } from '@/features/user/domain/core/admin-user';
import { IAdminUserRepository } from '@/features/user/domain/repositories/admin-user.repository.interface';
import { UserMapper } from '@/features/user/infra/database/typeorm/mappers/user.mapper';

@Injectable()
export class TypeormAdminUserRepository implements IAdminUserRepository {
  @InjectRepository(AdminUserEntity)
  private readonly adminUserRepository: Repository<AdminUserEntity>;

  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  @Inject(UserMapper)
  private readonly userMapper: UserMapper;

  async paginate(
    adminUserSearchParamsDto: AdminUserSearchParamsDto,
  ): Promise<ILengthAwarePaginator> {
    const queryBuilder: SelectQueryBuilder<UserEntity> =
      this.getListBaseQueryFilters(adminUserSearchParamsDto);

    const result = await toPaginate<UserEntity>(queryBuilder, {
      page: adminUserSearchParamsDto.page,
      perPage: adminUserSearchParamsDto.perPage,
    });

    result.data = await this.userMapper.collection(result.data);

    return result;
  }

  async findByUserUuid(userUuid: string): Promise<User> {
    const result = await this.getListBaseQuery()
      .andWhere('user.uuid = :userUuid', { userUuid })
      .getOne();

    return this.userMapper.optional(result);
  }

  async create(adminUser: AdminUser): Promise<AdminUser> {
    const adminUserEntity: AdminUserEntity = this.adminUserRepository.create({
      uuid: adminUser.uuid,
      user_uuid: adminUser.userUuid,
      created_at: adminUser.createdAt,
    });

    await this.adminUserRepository.save(adminUserEntity);

    return adminUser;
  }

  private getListBaseQuery(): SelectQueryBuilder<UserEntity> {
    return this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.uuid',
        'user.email',
        'user.active',
        'user.created_at',
        'admin_user',
        'person',
        'profile',
      ])
      .innerJoinAndSelect('user.admin_user', 'admin_user')
      .innerJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('admin_user.uuid IS NOT NULL');
  }

  private getListBaseQueryFilters(
    adminUserSearchParamsDto: AdminUserSearchParamsDto,
  ): SelectQueryBuilder<UserEntity> {
    const queryBuilder = this.getListBaseQuery();

    queryBuilder
      .when(adminUserSearchParamsDto.profilesUniqueName, (qb) =>
        qb.andWhere('profile.unique_name IN (:...profilesUniqueName)', {
          profilesUniqueName: adminUserSearchParamsDto.profilesUniqueName,
        }),
      )
      .when(adminUserSearchParamsDto.name, (qb, name) =>
        qb.andWhere('user.name ILIKE :name', { name: `%${name}%` }),
      )
      .when(adminUserSearchParamsDto.email, (qb, email) =>
        qb.andWhere('user.email = :email', { email }),
      )
      .when(
        adminUserSearchParamsDto.columnName,
        (qb) =>
          qb.orderBy(
            `user.${adminUserSearchParamsDto.columnName}`,
            adminUserSearchParamsDto.columnOrder,
          ),
        (qb) => qb.orderBy(`user.created_at`, 'DESC'),
      );

    return queryBuilder;
  }
}
