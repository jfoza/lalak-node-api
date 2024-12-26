import { Global, Module } from '@nestjs/common';
import { UserAbilitiesRoutine } from '@/acl/infra/database/typeorm/repositories/user-abilities.routine';
import { AclRepository } from '@/acl/infra/database/typeorm/repositories/acl.repository';
import { AclService } from '@/acl/application/services/acl.service';
import { AbilityMapper } from '@/acl/infra/database/typeorm/mappers/ability.mapper';
import { IAclRepository } from '@/acl/domain/repositories/acl.repository.interface';
import { IAclService } from '@/acl/domain/services/acl.service.interface';
import { UserModule } from '@/features/user/infra/modules/user.module';
import { IUserAbilities } from '@/acl/domain/repositories/user-abilities.routine.interface';

@Global()
@Module({
  imports: [UserModule],
  providers: [
    AbilityMapper,
    UserAbilitiesRoutine,
    {
      provide: IUserAbilities,
      useClass: UserAbilitiesRoutine,
    },

    AclRepository,
    {
      provide: IAclRepository,
      useExisting: AclRepository,
    },

    AclService,
    {
      provide: IAclService,
      useClass: AclService,
    },
  ],
  exports: [IAclService, IAclRepository],
})
export class AclModule {}
