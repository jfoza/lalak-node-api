import { IUserTokenRepository } from '@/features/user/domain/repositories/user-token.repository.interface';
import { UserToken } from '@/features/user/domain/core/user-token';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTokenEntity } from '@/features/user/infra/database/typeorm/entities/user-token.entity';
import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { UserTokenMapper } from '@/features/user/infra/database/typeorm/mappers/user-token.mapper';

@Injectable()
export class TypeormUserTokenRepository implements IUserTokenRepository {
  @InjectRepository(UserTokenEntity)
  private readonly userTokenEntityRepository: Repository<UserTokenEntity>;

  @Inject(UserTokenMapper)
  private readonly userTokenMapper: UserTokenMapper;

  async create(userToken: UserToken): Promise<UserToken> {
    const userTokenEntity = this.userTokenEntityRepository.create({
      uuid: userToken.uuid,
      user_uuid: userToken.userUuid,
      token: userToken.token,
      token_type: userToken.tokenType,
      created_at: userToken.createdAt,
    });

    await this.userTokenEntityRepository.save(userTokenEntity);

    return userToken;
  }

  async findByToken(token: string): Promise<UserToken> {
    const result = await this.userTokenEntityRepository.findOne({
      where: { token },
    });

    return this.userTokenMapper.optional(result);
  }
}
