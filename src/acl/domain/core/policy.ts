import { ForbiddenException, Injectable } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';

@Injectable()
export class Policy {
  private abilities: string[] = [];

  setAbilities(abilities: string[]): void {
    this.abilities = abilities;
  }

  getAbilities(): string[] {
    return this.abilities;
  }

  haveRule(rule: string): boolean {
    return this.getAbilities().includes(rule);
  }

  can(rule: string): void {
    if (!this.haveRule(rule)) {
      this.policyException();
    }
  }

  policyException(): void {
    throw new ForbiddenException(ErrorMessagesEnum.NOT_AUTHORIZED);
  }
}
