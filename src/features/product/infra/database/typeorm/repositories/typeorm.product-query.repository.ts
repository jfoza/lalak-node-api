import { ProductQueryRepository } from '@/features/product/domain/repositories/product-query.repository';
import { ProductSearchParams } from '@/features/product/domain/core/product-search-params';
import { Product } from '@/features/product/domain/core/product';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Inject } from '@nestjs/common';
import { ProductMapper } from '@/features/product/infra/database/typeorm/mappers/product.mapper';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '@/features/product/infra/database/typeorm/entities/product.entity';
import { toPaginate } from '@/common/infra/database/typeorm/pagination';

export class TypeormProductQueryRepository implements ProductQueryRepository {
  @InjectRepository(ProductEntity)
  private readonly productEntityRepository: Repository<ProductEntity>;

  @Inject(ProductMapper)
  private readonly productMapper: ProductMapper;

  async paginate(
    productSearchParams: ProductSearchParams,
  ): Promise<ILengthAwarePaginator> {
    const result = await toPaginate<ProductEntity>(
      this.getBaseQuery(productSearchParams),
      {
        page: productSearchParams.page,
        perPage: productSearchParams.perPage,
      },
    );

    result.data = await this.productMapper.collection(result.data);

    return result;
  }

  async findByUuid(uuid: string): Promise<Product | null> {
    const result = await this.productEntityRepository.findOne({
      where: { uuid },
      relations: ['categories', 'events'],
    });

    return this.productMapper.optional(result);
  }

  async findByCategoryUuid(categoryUuid: string): Promise<Product[]> {
    const result: ProductEntity[] = await this.productEntityRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'category')
      .where('category.uuid = :categoryUuid', { categoryUuid })
      .getMany();

    return this.productMapper.collection(result);
  }

  async findByEventUuid(eventUuid: string): Promise<Product[]> {
    const result: ProductEntity[] = await this.productEntityRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.events', 'event')
      .where('event.uuid = :eventUuid', { eventUuid })
      .getMany();

    return this.productMapper.collection(result);
  }

  async findByName(name: string): Promise<Product | null> {
    const result = await this.productEntityRepository.findOne({
      where: { description: name },
    });

    return this.productMapper.optional(result);
  }

  async findByProductUniqueName(uniqueName: string): Promise<Product | null> {
    const result = await this.productEntityRepository.findOne({
      where: { unique_name: uniqueName },
    });

    return this.productMapper.optional(result);
  }

  private getBaseQuery(
    productSearchParams: ProductSearchParams,
  ): SelectQueryBuilder<ProductEntity> {
    return this.productEntityRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'category')
      .leftJoinAndSelect('product.events', 'event')
      .when(productSearchParams.description, (qb, description) =>
        qb.andWhere('product.description ILIKE :description', {
          description: `%${description}%`,
        }),
      )
      .when(productSearchParams.categories.length > 0, (qb) =>
        qb.andWhere('category.uuid IN (:...categories)', {
          categories: productSearchParams.categories,
        }),
      )
      .when(productSearchParams.events.length > 0, (qb) =>
        qb.andWhere('event.uuid IN (:...events)', {
          events: productSearchParams.events,
        }),
      )
      .when(productSearchParams.active != null, (qb, active) =>
        qb.andWhere('product.active = :active', {
          active,
        }),
      );
  }
}
