import { UUID } from '@/utils/uuid';
import { File, FileProps } from '@/upload/domain/entities/file';
import { Readable } from 'stream';

describe('File Domain Entity Unit Tests', () => {
  let sut: File;
  let props: FileProps;

  beforeEach(async () => {
    props = {
      fieldname: 'file',
      storagename: 'product-image',
      originalname: 'image.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      size: 1024,
      stream: new Readable({
        read() {
          this.push(null);
        },
      }),
      destination: '/uploads/images',
      filename: 'image.jpg',
      path: '/uploads/images/image.jpg',
      buffer: Buffer.from('fake image data'),
    } as FileProps;

    sut = new File(props);
  });

  it('Constructor method', async () => {
    expect(sut).toBeInstanceOf(File);
    expect(sut.fieldname).toBe(props.fieldname);
    expect(sut.storagename).toBe(props.storagename);
    expect(sut.originalname).toBe(props.originalname);
    expect(sut.encoding).toBe(props.encoding);
    expect(sut.mimetype).toBe(props.mimetype);
    expect(sut.size).toBe(props.size);
    expect(sut.stream).toBe(props.stream);
    expect(sut.destination).toBe(props.destination);
    expect(sut.filename).toBe(props.filename);
    expect(sut.path).toBe(props.path);
    expect(sut.buffer).toBe(props.buffer);
  });

  it('Getter of fieldname field', () => {
    expect(sut.fieldname).toBeDefined();
    expect(sut.fieldname).toEqual(props.fieldname);
    expect(typeof sut.fieldname).toBe('string');
  });

  it('Getter of storagename field', () => {
    expect(sut.storagename).toBeDefined();
    expect(sut.storagename).toEqual(props.storagename);
    expect(typeof sut.storagename).toBe('string');
  });

  it('Getter of encoding field', () => {
    expect(sut.encoding).toBeDefined();
    expect(sut.encoding).toEqual(props.encoding);
    expect(typeof sut.encoding).toBe('string');
  });

  it('Getter of mimetype field', () => {
    expect(sut.mimetype).toBeDefined();
    expect(sut.mimetype).toEqual(props.mimetype);
    expect(typeof sut.mimetype).toBe('string');
  });

  it('Getter of size field', () => {
    expect(sut.size).toBeDefined();
    expect(sut.size).toEqual(props.size);
    expect(typeof sut.size).toBe('number');
  });

  it('Getter of stream field', () => {
    expect(sut.stream).toBeDefined();
    expect(sut.stream).toBeInstanceOf(Readable);
  });

  it('Getter of destination field', () => {
    expect(sut.destination).toBeDefined();
    expect(sut.destination).toEqual(props.destination);
    expect(typeof sut.destination).toBe('string');
  });

  it('Getter of filename field', () => {
    expect(sut.filename).toBeDefined();
    expect(sut.filename).toEqual(props.filename);
    expect(typeof sut.filename).toBe('string');
  });

  it('Getter of path field', () => {
    expect(sut.path).toBeDefined();
    expect(sut.path).toEqual(props.path);
    expect(typeof sut.path).toBe('string');
  });

  it('Getter of stream field', () => {
    expect(sut.buffer).toBeDefined();
    expect(sut.buffer).toBeInstanceOf(Buffer);
  });

  it('create method should to instance new City class', async () => {
    const uuid = UUID.generate();

    const fileClass = await File.create(props, uuid);

    expect(fileClass).toBeInstanceOf(File);
    expect(fileClass.uuid).toEqual(uuid);
  });
});
