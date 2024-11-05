import { Core } from '@/common/domain/core/core';

export type ImageProps = {
  path: string;
  type: string;
  createdAt?: Date;
};

export class Image extends Core<ImageProps> {
  constructor(
    public readonly props: ImageProps,
    uuid?: string,
  ) {
    super(props, uuid);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get path(): string {
    return this.props.path;
  }

  get type(): string {
    return this.props.type;
  }

  get createdAt(): Date {
    return this.props.createdAt ?? new Date();
  }

  static async create(props: ImageProps, uuid?: string): Promise<Image> {
    return new this(props, uuid);
  }
}
