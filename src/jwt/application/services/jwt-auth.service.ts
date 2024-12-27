import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { JwtVerifyOptions } from '@nestjs/jwt/dist/interfaces';
import { User, UserProps } from '@/features/user/domain/entities/user';
import { IUserRepository } from '@/features/user/domain/repositories/user-repository.interface';
import { IJwtAuthService } from '@/jwt/domain/services/jwt-auth.service.interface';

export interface IJwtToken {
  token: string;
  type: string;
  expiration: number;
}

@Injectable({ scope: Scope.REQUEST })
export class JwtAuthService implements IJwtAuthService {
  private authUser: User;

  constructor(
    private readonly nestJwtService: NestJwtService,

    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async setAuthUser(userProps: UserProps, uuid: string): Promise<void> {
    this.authUser = await User.create(userProps, uuid);
  }

  sign(payload: Buffer | object): IJwtToken {
    const token: string = this.nestJwtService.sign(payload);
    const expiration: number = +process.env.JWT_EXPIRATION;
    const type: string = 'JWT';

    return { token, type, expiration };
  }

  async verifyAsync(token: string, options?: JwtVerifyOptions): Promise<any> {
    return await this.nestJwtService.verifyAsync(token, options);
  }

  async user(relation: string | null = null): Promise<User | null> {
    if (!this.authUser) {
      return null;
    }

    if (!relation) {
      return this.authUser;
    }

    return await this.userRepository.findByUserLoggedByUuid(
      this.authUser.uuid,
      relation,
    );
  }
}
