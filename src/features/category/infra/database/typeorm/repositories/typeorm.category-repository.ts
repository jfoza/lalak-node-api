import { CategoryRepository } from '@/features/category/domain/repositories/category.repository';
import { Category } from '@/features/category/domain/entities/category';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CategoryEntity } from '@/features/category/infra/database/typeorm/entities/category.entity';
import { CategoryMapper } from '@/features/category/infra/database/typeorm/mappers/category.mapper';
import { ICategorySearchParamsDto } from '@/features/category/domain/dto/category-search-params.dto';

@Injectable()
export class TypeOrmCategoryRepository implements CategoryRepository {
  @InjectRepository(CategoryEntity)
  private readonly categoryEntityRepository: Repository<CategoryEntity>;

  @Inject(CategoryMapper)
  private readonly categoryMapper: CategoryMapper;

  async findAll(
    categorySearchParams: ICategorySearchParamsDto,
  ): Promise<Category[]> {
    const results = await this.getBaseQuery(categorySearchParams).getMany();

    return this.categoryMapper.collection(results);
  }

  // async paginate(
  //   categorySearchParams: ICategorySearchParamsDto,
  // ): Promise<ILengthAwarePaginator> {
  //   const result = await toPaginate<CategoryEntity>(
  //     this.getBaseQuery(categorySearchParams),
  //     {
  //       page: categorySearchParams.page,
  //       perPage: categorySearchParams.perPage,
  //     },
  //   );
  //
  //   result.data = await this.categoryMapper.collection(result.data);
  //
  //   return result;
  // }

  async findByUuid(uuid: string): Promise<Category | null> {
    const result = await this.categoryEntityRepository.findOne({
      where: { uuid },
      relations: ['products'],
    });

    return this.categoryMapper.optional(result);
  }

  async findByName(description: string): Promise<Category | null> {
    const result = await this.categoryEntityRepository.findOne({
      where: { description },
    });

    return this.categoryMapper.optional(result);
  }

  async findByThemeUuid(themeUuid: string): Promise<Category[]> {
    const result = await this.categoryEntityRepository.find({
      where: { theme_uuid: themeUuid },
    });

    return this.categoryMapper.collection(result);
  }

  async findByUuids(uuids: string[]): Promise<Category[]> {
    const result = await this.categoryEntityRepository
      .createQueryBuilder('category')
      .where('category.uuid IN (:...uuids)', { uuids })
      .getMany();

    return this.categoryMapper.collection(result);
  }

  async create(category: Category): Promise<Category> {
    const categoryEntity = this.categoryEntityRepository.create({
      uuid: category.uuid,
      theme_uuid: category.themeUuid,
      description: category.description,
      active: category.active,
    });

    await this.categoryEntityRepository.save(categoryEntity);

    return category;
  }

  async update(category: Category): Promise<Category> {
    await this.categoryEntityRepository.update(category.uuid, {
      uuid: category.uuid,
      theme_uuid: category.themeUuid,
      description: category.description,
      active: category.active,
    });

    return category;
  }

  async remove(uuid: string): Promise<void> {
    await this.categoryEntityRepository.delete(uuid);
  }

  private getBaseQuery(
    categorySearchParams: ICategorySearchParamsDto,
  ): SelectQueryBuilder<CategoryEntity> {
    return this.categoryEntityRepository
      .createQueryBuilder('category')
      .when(categorySearchParams.description, (qb, description) =>
        qb.andWhere('category.description ILIKE :description', {
          description: `%${description}%`,
        }),
      )
      .when(categorySearchParams.themeUuid, (qb, themeUuid) =>
        qb.andWhere('category.description = :themeUuid', {
          theme_uuid: themeUuid,
        }),
      )
      .when(categorySearchParams.active, (qb, active) =>
        qb.andWhere('category.active = :active', {
          active,
        }),
      );
  }
}
