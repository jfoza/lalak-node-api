import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtInfoService } from '@/jwt/application/services/jwt-info.service';
import { IAclRepository } from '@/acl/domain/repositories/acl.repository.interface';
import { IAclService } from '@/acl/domain/services/acl.service.interface';
import { User } from '@/features/user/domain/entities/user';
import { Ability } from '@/acl/domain/entities/ability';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';

@Injectable()
export class AclService implements IAclService {
  protected abilities: Ability[];

  constructor(
    @Inject(IAclRepository)
    private readonly aclRepository: IAclRepository,

    @Inject(JwtInfoService)
    private readonly jwtInfoService: JwtInfoService,
  ) {}

  async can(value: string): Promise<void> {
    if (!(await this.has(value))) {
      this.forbiddenException();
    }
  }

  async has(value: string): Promise<boolean> {
    const user: User = await this.jwtInfoService.user();

    this.abilities = await this.aclRepository.findAllByUserUuid(user.uuid);

    return this.abilities.some(
      (ability: Ability): boolean => ability.description === value,
    );
  }

  forbiddenException(): void {
    throw new ForbiddenException(ErrorMessagesEnum.NOT_AUTHORIZED);
  }
}
