import { BadRequestException } from '@nestjs/common';

export class EntityValidationException extends BadRequestException {
  constructor(public readonly errors: string[]) {
    super(`Validation failed: ${errors.join(', ')}`);
    this.name = 'ValidationException';
  }
}
