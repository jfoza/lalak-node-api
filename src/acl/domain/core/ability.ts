import { Core } from '@/common/domain/core/core';

export type AbilityProps = {
  description: string;
  subject: string;
  action: string;
  active: boolean;
};

export class Ability extends Core<AbilityProps> {
  constructor(
    public readonly props: AbilityProps,
    uuid?: string,
  ) {
    super(props, uuid);
  }

  static async create(props: AbilityProps, uuid?: string): Promise<Ability> {
    return new this(props, uuid);
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

  get active(): boolean {
    return this.props.active;
  }
}
