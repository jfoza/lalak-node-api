import { v4 as uuid4 } from 'uuid';

export class UUID {
  static generate(): string {
    return uuid4();
  }
}
