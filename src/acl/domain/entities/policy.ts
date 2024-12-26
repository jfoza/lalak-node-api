import { Core } from '@/common/domain/core/core';

export type TPolicyProps = {
  policies: string[];
};

export class Policy extends Core<TPolicyProps> {
  private constructor(public readonly props: TPolicyProps) {
    super(props);
  }

  get policies(): string[] {
    return this.props.policies;
  }

  static create(props: TPolicyProps): Policy {
    return new this(props);
  }
}
