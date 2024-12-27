import { Entity } from '@/common/domain/entities/entity';

export type AbilityProps = {
  description: string;
  subject: string;
  action: string;
};

export class Ability extends Entity<AbilityProps> {
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
