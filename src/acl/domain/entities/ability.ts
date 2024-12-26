import { Core } from '@/common/domain/core/core';

export type AbilityProps = {
  description: string;
  subject: string;
  action: string;
};

export class Ability extends Core<AbilityProps> {
  private constructor(
    public readonly props: AbilityProps,
    uuid?: string,
  ) {
    super(props, uuid);
  }

  get description(): string {
    return this.props.description;
  }

  get subject(): string {
    return this.props.subject;
  }

  get action(): string {
    return this.props.action;
  }

  static create(props: AbilityProps, uuid?: string): Ability {
    return new this(props, uuid);
  }
}
