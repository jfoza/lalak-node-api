import { User, UserProps } from '@/features/user/domain/entities/user';
import { Core } from '@/common/domain/core/core';

export class JwtAuth extends Core<User> {
  constructor(private readonly _user: User) {
    super(_user);
  }

  get user(): User {
    return this._user;
  }

  async create(props: UserProps): Promise<JwtAuth> {
    const user: User = await User.create(props);

    return new JwtAuth(user);
  }
}
