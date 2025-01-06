import { Entity } from '@/common/domain/entities/entity';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

export type AbilityProps = {
  description: string;
  subject: string;
  action: string;
};

export class Ability extends Entity<AbilityProps> {
  private constructor(
    public readonly props: AbilityProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
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

  static create(props: AbilityProps, uniqueEntityId?: UniqueEntityId): Ability {
    return new this(props, uniqueEntityId);
  }
}
