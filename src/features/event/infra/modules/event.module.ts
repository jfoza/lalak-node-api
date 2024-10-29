import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '@/features/event/infra/database/typeorm/entities/event.entity';
import { EventMapper } from '@/features/event/infra/database/typeorm/mappers/event.mapper';
import { TypeormEventRepository } from '@/features/event/infra/database/typeorm/repositories/typeorm.event.repository';
import { EventRepository } from '@/features/event/domain/repositories/event.repository';
import { EventListService } from '@/features/event/application/services/event-list.service';
import { AbstractEventListService } from '@/features/event/domain/services/abstract.event-list.service';
import { PublicEventListService } from '@/features/event/application/services/public.event-list.service';
import { PublicAbstractEventListService } from '@/features/event/domain/services/public.abstract.event-list.service';
import { AbstractEventCreateUseCase } from '@/features/event/domain/use-cases/abstract.event-create.use-case';
import { EventListUseCase } from '@/features/event/application/use-cases/event-list.use-case';
import { AbstractEventListUseCase } from '@/features/event/domain/use-cases/abstract.event-list.use-case';
import { EventListByUuidUseCase } from '@/features/event/application/use-cases/event-list-by-uuid.use-case';
import { AbstractEventListByUuidUseCase } from '@/features/event/domain/use-cases/abstract.event-list-by-uuid.use-case';
import { EventCreateUseCase } from '@/features/event/application/use-cases/event-create.use-case';
import { EventUpdateUseCase } from '@/features/event/application/use-cases/event-update.use-case';
import { AbstractEventUpdateUseCase } from '@/features/event/domain/use-cases/abstract.event-update.use-case';
import { EventRemoveUseCase } from '@/features/event/application/use-cases/event-remove.use-case';
import { AbstractEventRemoveUseCase } from '@/features/event/domain/use-cases/abstract.event-remove.use-case';
import { forwardRef, Module } from '@nestjs/common';
import { EventController } from '@/features/event/presentation/controllers/event.controller';
import { ProductModule } from '@/features/product/infra/modules/product.module';

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
      provide: AbstractEventListService,
      useExisting: EventListService,
    },

    PublicEventListService,
    {
      provide: PublicAbstractEventListService,
      useExisting: PublicEventListService,
    },

    EventListUseCase,
    {
      provide: AbstractEventListUseCase,
      useExisting: EventListUseCase,
    },

    EventListByUuidUseCase,
    {
      provide: AbstractEventListByUuidUseCase,
      useExisting: EventListByUuidUseCase,
    },

    EventCreateUseCase,
    {
      provide: AbstractEventCreateUseCase,
      useExisting: EventCreateUseCase,
    },

    EventUpdateUseCase,
    {
      provide: AbstractEventUpdateUseCase,
      useExisting: EventUpdateUseCase,
    },

    EventRemoveUseCase,
    {
      provide: AbstractEventRemoveUseCase,
      useExisting: EventRemoveUseCase,
    },
  ],
  exports: [EventRepository],
})
export class EventModule {}
