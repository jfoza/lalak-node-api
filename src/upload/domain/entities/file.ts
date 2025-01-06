import { Entity } from '@/common/domain/entities/entity';
import { Readable } from 'stream';
import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';

export type FileProps = {
  fieldname: string;
  storagename: string;
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

export class File extends Entity<FileProps> {
  constructor(
    public readonly props: FileProps,
    uniqueEntityId?: UniqueEntityId,
  ) {
    super(props, uniqueEntityId);
  }

  get fieldname(): string {
    return this.props.fieldname;
  }

  get originalname(): string {
    return this.props.originalname;
  }

  get storagename(): string {
    return this.props.storagename;
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

  static async create(
    props: FileProps,
    uniqueEntityId?: UniqueEntityId,
  ): Promise<File> {
    return new this(props, uniqueEntityId);
  }
}
