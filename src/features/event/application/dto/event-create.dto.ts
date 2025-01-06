import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IEventCreateDto } from '@/features/event/domain/dto/event-create.dto';

export class EventCreateDto implements IEventCreateDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
