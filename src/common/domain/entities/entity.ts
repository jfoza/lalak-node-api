import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

export class Entity<Props> {
  public readonly uniqueEntityId: UniqueEntityId;
  public readonly props: Props;

  constructor(props: Props, uniqueEntityId?: UniqueEntityId) {
    this.uniqueEntityId = uniqueEntityId ?? UniqueEntityId.create();
    this.props = props;
  }

  get uuid(): string {
    return this.uniqueEntityId.toValue();
  }

  toJSON(): Required<{ uuid: string } & Props> {
    return {
      uuid: this.uuid,
      ...this.props,
    } as Required<{ uuid: string } & Props>;
  }
}
