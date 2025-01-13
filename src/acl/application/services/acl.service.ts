import { Inject, Injectable, Scope } from '@nestjs/common';
import { IAclRepository } from '@/acl/domain/repositories/acl.repository.interface';
import { IAclService } from '@/acl/domain/services/acl.service.interface';
import { IJwtAuthService } from '@/jwt/domain/services/jwt-auth.service.interface';
import { IAuthUser } from '@/features/auth/domain/services/login.service.interface';

@Injectable({ scope: Scope.REQUEST })
export class AclService implements IAclService {
  constructor(
    @Inject(IAclRepository)
    private readonly aclRepository: IAclRepository,

    @Inject(IJwtAuthService)
    private readonly jwtAuthService: IJwtAuthService,
  ) {}

  async execute(): Promise<string[]> {
    const user: IAuthUser = this.jwtAuthService.user;

    return await this.aclRepository.findDescriptionByUserUuid(user.userUuid);
  }
}
