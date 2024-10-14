import { v4 as uuid4 } from 'uuid';

export class Core<Props> {
  public readonly _uuid: string;
  public readonly props: Props;

  constructor(props: Props, uuid?: string) {
    this._uuid = uuid || uuid4();
    this.props = props;
  }

  get uuid() {
    return this._uuid;
  }

  toJSON(): Required<{ uuid: string } & Props> {
    return {
      uuid: this._uuid,
      ...this.props,
    } as Required<{ uuid: string } & Props>;
  }
}
