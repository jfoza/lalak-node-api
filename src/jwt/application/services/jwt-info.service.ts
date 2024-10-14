import { Inject, Injectable, Scope } from '@nestjs/common';
import { User } from '@/features/user/domain/core/user';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';

@Injectable({ scope: Scope.REQUEST })
export class JwtInfoService {
  private user: User;

  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  async getUserRelations(relation: string): Promise<User | null> {
    if (this.user && !this.user[relation]) {
      return await this.userRepository.findByUserLoggedByUuid(
        this.user.uuid,
        relation,
      );
    }

    return this.user;
  }
}
