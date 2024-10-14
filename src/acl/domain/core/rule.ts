import { Core } from '@/common/domain/core/core';

export type RuleProps = {
  description: string;
  subject: string;
  action: string;
  active: boolean;
};

export class Rule extends Core<RuleProps> {
  constructor(
    public readonly props: RuleProps,
    uuid?: string,
  ) {
    super(props, uuid);
  }

  static async create(props: RuleProps, uuid?: string): Promise<Rule> {
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
