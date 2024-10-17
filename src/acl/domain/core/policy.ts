import { ForbiddenException, Injectable } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

@Injectable()
export class Policy {
  private _abilities: string[] = [];

  get abilities(): string[] {
    return this._abilities;
  }

  set abilities(abilities: string[]) {
    this._abilities = abilities;
  }

  has(ability: string): boolean {
    return this.abilities.includes(ability);
  }

  can(ability: string): void {
    if (!this.has(ability)) {
      this.policyException();
    }
  }

  policyException(): void {
    throw new ForbiddenException(ErrorMessagesEnum.NOT_AUTHORIZED);
  }
}
