import { Core } from '@/common/domain/core/core';
import { BrazilianStates } from '@/common/infra/enums/brazilian-states.enum';
import { CityValidatorFactory } from '@/features/city/domain/validators/city.validator';

export type CityProps = {
  description: string;
  uf: string;
  active?: boolean;
  createdAt?: Date;
};

export class City extends Core<CityProps> {
  constructor(
    public readonly props: CityProps,
    uuid?: string,
  ) {
    super(props, uuid);
  }

  get description(): string {
    return this.props.description;
  }

  get uf(): string {
    return this.props.uf;
  }

  get active(): boolean {
    return this.props.active;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set description(description: string) {
    this.props.description = description;
  }

  set uf(uf: BrazilianStates) {
    this.props.description = uf;
  }

  set active(active: boolean) {
    this.props.active = active;
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  static async validate(props: CityProps): Promise<void> {
    const validator = CityValidatorFactory.create();
    await validator.validate(props);
  }

  static async create(props: CityProps, uuid?: string): Promise<City> {
    await this.validate(props);
    return new this(props, uuid);
  }
}