import { Entity } from '@/common/domain/entities/entity';
import { AclForbiddenException } from '@/common/domain/exceptions/acl.forbbiden.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Policy extends Entity<string[]> {
  constructor(private _abilities: string[] = []) {
    super(_abilities);
  }

  get abilities(): string[] {
    return this._abilities;
  }

  set abilities(abilities: string[]) {
    this._abilities = abilities;
  }

  can(value: string): void {
    if (!this.has(value)) {
      throw new AclForbiddenException();
    }
  }

  has(value: string): boolean {
    return this.abilities.includes(value);
  }
}
