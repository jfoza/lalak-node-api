import { Core } from '@/common/domain/core/core';
import { Readable } from 'stream';

export type FileProps = {
  fieldname: string;
  storageName: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: Readable;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
};

export class File extends Core<FileProps> {
  constructor(
    public readonly props: FileProps,
    uuid?: string,
  ) {
    super(props, uuid);
  }

  get fieldname(): string {
    return this.props.fieldname;
  }

  get originalname(): string {
    return this.props.originalname;
  }

  get storageName(): string {
    return this.props.storageName;
  }

  get encoding(): string {
    return this.props.encoding;
  }

  get mimetype(): string {
    return this.props.mimetype;
  }

  get size(): number {
    return this.props.size;
  }

  get stream(): Readable {
    return this.props.stream;
  }

  get destination(): string {
    return this.props.destination;
  }

  get filename(): string {
    return this.props.filename;
  }

  get path(): string {
    return this.props.path;
  }

  get buffer(): Buffer {
    return this.props.buffer;
  }

  static async create(props: FileProps, uuid?: string): Promise<File> {
    return new this(props, uuid);
  }
}
