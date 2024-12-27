import { Injectable } from '@nestjs/common';
import { Ability, AbilityProps } from '@/acl/domain/entities/ability';
import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';

export type TAbilityEntity = {
  description: string;
  subject: string;
  action: string;
};

@Injectable()
export class AbilityMapper extends Mapper<TAbilityEntity, Ability> {
  async from(ormEntity: TAbilityEntity): Promise<Ability> {
    const props: AbilityProps = {
      ...ormEntity,
    };

    return Ability.create(props);
  }
}
