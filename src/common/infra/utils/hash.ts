import { hash, compare } from 'bcrypt';

export abstract class Hash {
  static async createHash(value: string): Promise<string> {
    return await hash(value, 10);
  }

  static async compareHash(payload: string, hashed: string): Promise<boolean> {
    return await compare(payload, hashed);
  }
}
