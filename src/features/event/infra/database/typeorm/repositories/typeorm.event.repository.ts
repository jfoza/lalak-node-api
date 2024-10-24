import { Event } from '@/features/event/domain/core/event';
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { toPaginate } from '@/common/infra/database/typeorm/pagination';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventEntity } from '@/features/event/infra/database/typeorm/entities/event.entity';
import { EventMapper } from '@/features/event/infra/database/typeorm/mappers/event.mapper';
import { EventSearchParams } from '@/features/event/domain/core/event-search-params';

@Injectable()
export class TypeormEventRepository implements EventRepository {
  @InjectRepository(EventEntity)
  private readonly eventEntityRepository: Repository<EventEntity>;

  @Inject(EventMapper)
  private readonly eventMapper: EventMapper;

  async findAll(eventSearchParams: EventSearchParams): Promise<Event[]> {
    const results = await this.getBaseQuery(eventSearchParams).getMany();

    return this.eventMapper.collection(results);
  }

  async paginate(
    eventSearchParams: EventSearchParams,
  ): Promise<ILengthAwarePaginator> {
    const result = await toPaginate<EventEntity>(
      this.getBaseQuery(eventSearchParams),
      {
        page: eventSearchParams.page,
        perPage: eventSearchParams.perPage,
      },
    );

    result.data = await this.eventMapper.collection(result.data);

    return result;
  }

  async findByName(description: string): Promise<Event | null> {
    const result = await this.eventEntityRepository.findOne({
      where: { description },
    });

    return this.eventMapper.optional(result);
  }

  async findByUuid(uuid: string): Promise<Event | null> {
    const result = await this.eventEntityRepository.findOne({
      where: { uuid },
    });

    return this.eventMapper.optional(result);
  }

  async create(event: Event): Promise<Event> {
    const eventEntity = this.eventEntityRepository.create({
      uuid: event.uuid,
      description: event.description,
      active: event.active,
      created_at: event.createdAt,
    });

    await this.eventEntityRepository.save(eventEntity);

    return event;
  }

  async update(event: Event): Promise<Event> {
    await this.eventEntityRepository.update(event.uuid, {
      uuid: event.uuid,
      description: event.description,
      active: event.active,
    });

    return event;
  }

  async remove(uuid: string): Promise<void> {
    await this.eventEntityRepository.delete(uuid);
  }

  private getBaseQuery(
    eventSearchParams: EventSearchParams,
  ): SelectQueryBuilder<EventEntity> {
    return this.eventEntityRepository
      .createQueryBuilder('event')
      .when(eventSearchParams.description, (qb, description) =>
        qb.andWhere('event.description ILIKE :description', {
          description: `%${description}%`,
        }),
      );
  }
}
