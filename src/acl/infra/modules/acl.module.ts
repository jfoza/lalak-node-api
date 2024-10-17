import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityEntity } from '@/acl/infra/database/typeorm/entities/ability.entity';
import { GetUserAbilitiesRoutine } from '@/acl/infra/database/typeorm/routines/get-user-abilities.routine';
import { AclRepository } from '@/acl/infra/database/typeorm/repositories/acl.repository';
import { AclService } from '@/acl/application/services/acl.service';
import { Policy } from '@/acl/domain/core/policy';
import { AbilityMapper } from '@/acl/infra/database/typeorm/mappers/ability.mapper';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AbilityEntity])],
  providers: [
    GetUserAbilitiesRoutine,
    AbilityMapper,
    AclRepository,
    {
      provide: 'IAclRepository',
      useExisting: AclRepository,
    },

    AclService,
    Policy,
    {
      provide: Policy,
      useFactory: async (aclService: AclService) => {
        const abilities = await aclService.handle();

        const policy = new Policy();
        policy.abilities = abilities;

        return policy;
      },
      inject: [AclService],
    },
  ],
  exports: [Policy, 'IAclRepository'],
})
export class AclModule {}
