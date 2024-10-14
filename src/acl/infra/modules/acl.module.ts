import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuleEntity } from '@/acl/infra/database/typeorm/entities/rule.entity';
import { GetUserRulesRoutine } from '@/acl/infra/database/typeorm/routines/get-user-rules.routine';
import { AclRepository } from '@/acl/infra/database/typeorm/repositories/acl.repository';
import { AclService } from '@/acl/application/services/acl.service';
import { Policy } from '@/acl/domain/core/policy';
import { RuleMapper } from '@/acl/infra/database/typeorm/mappers/rule.mapper';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([RuleEntity])],
  providers: [
    GetUserRulesRoutine,
    RuleMapper,
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
        policy.setAbilities(abilities);

        return policy;
      },
      inject: [AclService],
    },
  ],
  exports: [Policy, 'IAclRepository'],
})
export class AclModule {}
