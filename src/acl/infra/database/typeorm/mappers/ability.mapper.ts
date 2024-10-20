import { Mapper } from '@/common/infra/database/typeorm/mappers/Mapper';
import { AbilityEntity } from '@/acl/infra/database/typeorm/entities/ability.entity';
import { Ability, AbilityProps } from '@/acl/domain/core/ability';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AbilityMapper extends Mapper<
  AbilityEntity,
  Ability,
  AbilityProps
> {
  protected snakeCaseMapper: boolean = true;

  protected async toDomainEntity(
    props: AbilityProps,
    uuid: string,
  ): Promise<Ability> {
    return Ability.create(props, uuid);
  }
}
