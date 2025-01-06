import { Entity } from '@/common/domain/entities/entity';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { Uf } from '@/common/domain/value-objects/uf';

export type CityProps = {
  description: string;
  uf: Uf;
  active?: boolean;
  createdAt?: Date;
};

export class City extends Entity<CityProps> {
  constructor(
    public readonly props: CityProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
  }

  get description(): string {
    return this.props.description;
  }

  get uf(): string {
    return this.props.uf.toValue();
  }

  get active(): boolean {
    return this.props.active;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static async create(
    props: CityProps,
    uniqueEntityId?: UniqueEntityId,
  ): Promise<City> {
    return new this(props, uniqueEntityId);
  }
}
