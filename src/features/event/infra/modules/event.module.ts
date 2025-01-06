import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '@/features/event/infra/database/typeorm/entities/event.entity';
import { EventMapper } from '@/features/event/infra/database/typeorm/mappers/event.mapper';
import { TypeormEventRepository } from '@/features/event/infra/database/typeorm/repositories/typeorm.event.repository';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventListService } from '@/features/event/application/services/event-list.service';
import { PublicEventListService } from '@/features/event/application/services/public.event-list.service';
import { EventListUseCase } from '@/features/event/application/use-cases/event-list.use-case';
import { EventCreateUseCase } from '@/features/event/application/use-cases/event-create.use-case';
import { EventUpdateUseCase } from '@/features/event/application/use-cases/event-update.use-case';
import { EventRemoveUseCase } from '@/features/event/application/use-cases/event-remove.use-case';
import { forwardRef, Module } from '@nestjs/common';
import { EventController } from '@/features/event/presentation/controllers/event.controller';
import { ProductModule } from '@/features/product/infra/modules/product.module';
import { EventListByUuidUseCase } from '@/features/event/application/use-cases/event-list-by-uuid.use-case';
import { IEventListByUuidUseCase } from '@/features/event/domain/use-cases/event-list-by-uuid.use-case';
import { IEventUpdateUseCase } from '@/features/event/domain/use-cases/event-update.use-case';
import { IEventRemoveUseCase } from '@/features/event/domain/use-cases/event-remove.use-case';
import { IEventCreateUseCase } from '@/features/event/domain/use-cases/event-create.use-case';
import { IPublicEventListService } from '@/features/event/domain/services/public.event-list.service';
import { IEventListService } from '@/features/event/domain/services/event-list.service';
import { IEventListUseCase } from '@/features/event/domain/use-cases/event-list.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity]),
    forwardRef(() => ProductModule),
  ],
  controllers: [EventController],
  providers: [
    EventMapper,
    TypeormEventRepository,
    {
      provide: EventRepository,
      useExisting: TypeormEventRepository,
    },

    EventListService,
    {
      provide: IEventListService,
      useExisting: EventListService,
    },

    PublicEventListService,
    {
      provide: IPublicEventListService,
      useExisting: PublicEventListService,
    },

    EventListUseCase,
    {
      provide: IEventListUseCase,
      useExisting: EventListUseCase,
    },

    EventListByUuidUseCase,
    {
      provide: IEventListByUuidUseCase,
      useExisting: EventListByUuidUseCase,
    },

    EventCreateUseCase,
    {
      provide: IEventCreateUseCase,
      useExisting: EventCreateUseCase,
    },

    EventUpdateUseCase,
    {
      provide: IEventUpdateUseCase,
      useExisting: EventUpdateUseCase,
    },

    EventRemoveUseCase,
    {
      provide: IEventRemoveUseCase,
      useExisting: EventRemoveUseCase,
    },
  ],
  exports: [EventRepository],
})
export class EventModule {}
