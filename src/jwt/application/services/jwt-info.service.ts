import { Inject, Injectable, Scope } from '@nestjs/common';
import { User } from '@/features/user/domain/core/user';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';

@Injectable({ scope: Scope.REQUEST })
export class JwtInfoService {
  private _user: User;

  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  get user(): User | null {
    return this._user;
  }

  set user(user: User) {
    this._user = user;
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
