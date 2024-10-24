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
import { ILengthAwarePaginator } from '@/common/domain/interfaces/length-aware-paginator.interface';
import { Event } from '@/features/event/domain/core/event';
import { AbstractEventListService } from '@/features/event/domain/services/abstract.event-list.service';
import { AbstractEventListByUuidUseCase } from '@/features/event/domain/use-cases/abstract.event-list-by-uuid.use-case';
import { AbstractEventCreateUseCase } from '@/features/event/domain/use-cases/abstract.event-create.use-case';
import { AbstractEventUpdateUseCase } from '@/features/event/domain/use-cases/abstract.event-update.use-case';
import { AbstractEventRemoveUseCase } from '@/features/event/domain/use-cases/abstract.event-remove.use-case';
import { EventSearchParamsDto } from '@/features/event/application/dto/event-search-params.dto';
import { EventCreateDto } from '@/features/event/application/dto/event-create.dto';
import { EventUpdateDto } from '@/features/event/application/dto/event-update.dto';

@UseGuards(AuthGuard)
@Controller('admin/events')
export class EventController {
  @Inject(AbstractEventListService)
  private readonly eventListService: AbstractEventListService;

  @Inject(AbstractEventListByUuidUseCase)
  private readonly eventListByUuidUseCase: AbstractEventListByUuidUseCase;

  @Inject(AbstractEventCreateUseCase)
  private readonly eventCreateUseCase: AbstractEventCreateUseCase;

  @Inject(AbstractEventUpdateUseCase)
  private readonly eventUpdateUseCase: AbstractEventUpdateUseCase;

  @Inject(AbstractEventRemoveUseCase)
  private readonly eventRemoveUseCase: AbstractEventRemoveUseCase;

  @Get()
  async index(
    @Query() eventSearchParamsDto: EventSearchParamsDto,
  ): Promise<ILengthAwarePaginator | Event[]> {
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
