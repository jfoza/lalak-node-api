import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '@/features/category/infra/database/typeorm/entities/category.entity';
import {
  Category,
  CategoryProps,
} from '@/features/category/domain/entities/category';
import { Mapper } from '@/common/infra/database/typeorm/mappers/mapper';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

@Injectable()
export class CategoryMapper extends Mapper<CategoryEntity, Category> {
  static get toDomain(): CategoryMapper {
    return new this();
  }

  async from(raw: CategoryEntity): Promise<Category> {
    const props: CategoryProps = {
      themeUuid: UniqueEntityId.create(raw.theme_uuid),
      description: raw.description,
      active: raw.active,
      createdAt: raw.created_at,
    };

    return Category.create(props, UniqueEntityId.create(raw.uuid));
  }
}
