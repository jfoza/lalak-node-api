import { Theme, ThemeProps } from '@/features/theme/domain/entities/theme';
import { ThemeEntity } from '@/features/theme/infra/database/typeorm/entities/theme.entity';
import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

export class ThemeMapper extends Mapper<ThemeEntity, Theme> {
  static get toDomain(): ThemeMapper {
    return new this();
  }

  async from(ormEntity: ThemeEntity): Promise<Theme> {
    return Theme.create(
      {
        description: ormEntity.description,
        active: ormEntity.active,
        createdAt: ormEntity.created_at,
      } as ThemeProps,
      UniqueEntityId.create(ormEntity.uuid),
    );
  }
}
