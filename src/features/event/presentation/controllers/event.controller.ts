import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@/features/auth/infra/config/auth.guard';
import { Event } from '@/features/event/domain/entities/event';
import { eventSearchParamsDto } from '@/features/event/application/dto/event-search-params.dto';
import { EventCreateDto } from '@/features/event/application/dto/event-create.dto';
import { EventUpdateDto } from '@/features/event/application/dto/event-update.dto';
import { IEventListService } from '@/features/event/domain/services/event-list.service';
import { IEventListByUuidUseCase } from '@/features/event/domain/use-cases/event-list-by-uuid.use-case';
import { IEventRemoveUseCase } from '@/features/event/domain/use-cases/event-remove.use-case';
import { IEventUpdateUseCase } from '@/features/event/domain/use-cases/event-update.use-case';
import { IEventCreateUseCase } from '@/features/event/domain/use-cases/event-create.use-case';
import { TPaginationOrder } from '@/common/presentation/types/pagination-order.type';
import { ZodValidationPipe } from '@/common/presentation/zod/validation-pipes/zod.validation-pipe';
import { eventSearchParamsDtoSchema } from '@/features/event/presentation/zod/schemas';

type TEventSearchParams = {
  description?: string;
} & TPaginationOrder;

@UseGuards(AuthGuard)
@Controller('admin/events')
export class EventController {
  @Inject(IEventListService)
  private readonly eventListService: IEventListService;

  @Inject(IEventListByUuidUseCase)
  private readonly eventListByUuidUseCase: IEventListByUuidUseCase;

  @Inject(IEventCreateUseCase)
  private readonly eventCreateUseCase: IEventCreateUseCase;

  @Inject(IEventUpdateUseCase)
  private readonly eventUpdateUseCase: IEventUpdateUseCase;

  @Inject(IEventRemoveUseCase)
  private readonly eventRemoveUseCase: IEventRemoveUseCase;

  @Get()
  async index(
    @Query(new ZodValidationPipe(eventSearchParamsDtoSchema))
    query: TEventSearchParams,
  ): Promise<Event[]> {
    eventSearchParamsDto.description = query.description;

    eventSearchParamsDto.paginationOrder.page = query.page;
    eventSearchParamsDto.paginationOrder.perPage = query.perPage;
    eventSearchParamsDto.paginationOrder.columnOrder = query.columnOrder;
    eventSearchParamsDto.paginationOrder.columnName = query.columnName;

    return await this.eventListService.handle(eventSearchParamsDto);
  }

  @Get(':uuid')
  async show(@Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<Event> {
    return await this.eventListByUuidUseCase.execute(uuid);
  }

  @Post()
  async insert(@Body() eventCreateDto: EventCreateDto): Promise<Event> {
    return await this.eventCreateUseCase.execute(eventCreateDto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() eventUpdateDto: EventUpdateDto,
  ): Promise<Event> {
    return await this.eventUpdateUseCase.execute(uuid, eventUpdateDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':uuid')
  async delete(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<void> {
    await this.eventRemoveUseCase.execute(uuid);
  }
}
