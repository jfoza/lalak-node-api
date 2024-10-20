import {
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema<any>) {}

  transform(value: any) {
    const parsedResult = this.schema.safeParse(value);
    if (!parsedResult.success) {
      const errorMessages = parsedResult.error.errors.map((error) => {
        return error.message;
      });

      throw new BadRequestException({
        message: errorMessages,
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
    return parsedResult.data;
  }
}
