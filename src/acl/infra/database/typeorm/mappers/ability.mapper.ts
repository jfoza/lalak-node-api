import { Mapper } from '@/common/infra/database/typeorm/mappers/Mapper';
import { Injectable } from '@nestjs/common';
import { Ability, AbilityProps } from '@/acl/domain/entities/ability';

type TAbilityEntity = {
  description: string;
  subject: string;
  action: string;
};

@Injectable()
export class AbilityMapper extends Mapper<
  TAbilityEntity,
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
