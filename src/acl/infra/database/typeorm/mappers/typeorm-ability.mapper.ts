import { Ability, AbilityProps } from '@/acl/domain/entities/ability';
import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';

export type TAbilityEntity = {
  description: string;
  subject: string;
  action: string;
};

export class TypeormAbilityMapper extends Mapper<TAbilityEntity, Ability> {
  static get toDomain(): TypeormAbilityMapper {
    return new this();
  }

  async from(raw: TAbilityEntity): Promise<Ability> {
    const props: AbilityProps = {
      ...raw,
    };

    return Ability.create(props);
  }
}
