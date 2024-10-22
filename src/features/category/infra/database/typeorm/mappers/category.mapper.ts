import { Mapper } from '@/common/infra/database/typeorm/mappers/Mapper';
import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '@/features/category/infra/database/typeorm/entities/category.entity';
import {
  Category,
  CategoryProps,
} from '@/features/category/domain/core/category';

@Injectable()
export class CategoryMapper extends Mapper<
  CategoryEntity,
  Category,
  CategoryProps
> {
  protected snakeCaseMapper: boolean = true;

  protected toDomainEntity(
    props: CategoryProps,
    uuid: string,
  ): Promise<Category> {
    return Category.create(props, uuid);
  }
}
