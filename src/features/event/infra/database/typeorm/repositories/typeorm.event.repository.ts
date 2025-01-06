import { Event } from '@/features/event/domain/entities/event';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventEntity } from '@/features/event/infra/database/typeorm/entities/event.entity';
import { EventMapper } from '@/features/event/infra/database/typeorm/mappers/event.mapper';
import { IEventSearchParamsDto } from '@/features/event/domain/dto/event-search-params.dto';

@Injectable()
export class TypeormEventRepository implements EventRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventEntityRepository: Repository<EventEntity>,
  ) {}

  async findAll(eventSearchParams: IEventSearchParamsDto): Promise<Event[]> {
    const results = await this.getBaseQuery(eventSearchParams).getMany();

    return EventMapper.toDomain.collection(results);
  }

  // async paginate(
  //   eventSearchParams: EventSearchParams,
  // ): Promise<ILengthAwarePaginator> {
  //   const result = await toPaginate<EventEntity>(
  //     this.getBaseQuery(eventSearchParams),
  //     {
  //       page: eventSearchParams.page,
  //       perPage: eventSearchParams.perPage,
  //     },
  //   );
  //
  //   result.data = await this.eventMapper.collection(result.data);
  //
  //   return result;
  // }

  async findByName(description: string): Promise<Event | null> {
    const result = await this.eventEntityRepository.findOne({
      where: { description },
    });

    return EventMapper.toDomain.optional(result);
  }

  async findByUuid(uuid: string): Promise<Event | null> {
    const result = await this.eventEntityRepository.findOne({
      where: { uuid },
      relations: ['products'],
    });

    return EventMapper.toDomain.optional(result);
  }

  async findByUuids(uuids: string[]): Promise<Event[]> {
    const result = await this.eventEntityRepository
      .createQueryBuilder('event')
      .where('event.uuid IN (:...uuids)', { uuids })
      .getMany();

    return EventMapper.toDomain.collection(result);
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
    eventSearchParams: IEventSearchParamsDto,
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
