import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { User } from '@/features/user/domain/entities/user';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { JwtAuth } from '@/jwt/domain/entities/jwt-auth';

@Injectable({ scope: Scope.REQUEST })
export class JwtInfoService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,

    @Inject(JwtAuth)
    private readonly jwtAuth: JwtAuth,
  ) {}

  async user(relation: string | null = null): Promise<User | null> {
    const authUser: User = this.jwtAuth.user;

    if (!authUser) {
      return null;
    }

    if (!relation) {
      return authUser;
    }

    if (!(relation in authUser)) {
      throw new BadRequestException('Relation does not exists.');
    }

    return await this.userRepository.findByUserLoggedByUuid(
      authUser.uuid,
      relation,
    );
  }
}
