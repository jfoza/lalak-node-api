import { Global, Module } from '@nestjs/common';
import { UserAbilitiesRoutine } from '@/acl/infra/database/typeorm/repositories/user-abilities.routine';
import { AclRepository } from '@/acl/infra/database/typeorm/repositories/acl.repository';
import { AclService } from '@/acl/application/services/acl.service';
import { TypeormAbilityMapper } from '@/acl/infra/database/typeorm/mappers/typeorm-ability.mapper';
import { IAclRepository } from '@/acl/domain/repositories/acl.repository.interface';
import { UserModule } from '@/features/user/infra/modules/user.module';
import { IUserAbilitiesRoutine } from '@/acl/domain/repositories/user-abilities.routine.interface';
import { IAclService } from '@/acl/domain/services/acl.service.interface';
import { PolicyAdapter } from '@/acl/application/adapters/policy.adapter';
import { Policy } from '@/acl/domain/value-objects/policy';
import { IPolicyAdapter } from '@/acl/application/adapters/policy.adapter.interface';

@Global()
@Module({
  imports: [UserModule],
  providers: [
    TypeormAbilityMapper,

    AclService,
    {
      provide: IAclService,
      useClass: AclService,
    },

    UserAbilitiesRoutine,
    {
      provide: IUserAbilitiesRoutine,
      useClass: UserAbilitiesRoutine,
    },

    AclRepository,
    {
      provide: IAclRepository,
      useExisting: AclRepository,
    },

    PolicyAdapter,
    {
      provide: IPolicyAdapter,
      useFactory: async (aclService: IAclService): Promise<PolicyAdapter> => {
        const policy: Policy = Policy.create(await aclService.execute());

        return new PolicyAdapter(policy);
      },

      inject: [IAclService],
    },
  ],
  exports: [PolicyAdapter, IAclRepository],
})
export class AclModule {}
