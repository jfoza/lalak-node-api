import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '@/features/auth/domain/interfaces/auth.repository.interface';
import { AuthEntity } from '@/features/auth/infra/database/typeorm/entities/auth.entity';
import { Auth } from '@/features/auth/domain/core/Auth';

@Injectable()
export class AuthRepository implements IAuthRepository {
  @InjectRepository(AuthEntity)
  private readonly repository: Repository<AuthEntity>;

  async create(auth: Auth): Promise<Auth> {
    const authEntity: AuthEntity = this.repository.create({
      user_uuid: auth.userUuid,
      initial_date: auth.initialDate,
      final_date: auth.finalDate,
      token: auth.token,
      ip_address: auth.ipAddress,
      auth_type: auth.authType,
    });

    await this.repository.save(authEntity);

    return auth;
  }
}
