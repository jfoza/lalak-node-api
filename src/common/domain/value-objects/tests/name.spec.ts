import { Name } from '@/common/domain/value-objects/name';

describe('Name Value Object Unit Tests', () => {
  let sut: Name;

  it('should return the name value correctly', () => {
    sut = Name.createFrom('test');
    expect(sut.toValue()).toEqual('Test');
  });

  it('createFrom method should return the name with each word capitalized', () => {
    sut = Name.createFrom('test name');
    expect(sut.toValue()).toEqual('Test Name');
    expect(sut).toBeInstanceOf(Name);
  });

  it.each([
    ['tEs$t n_ame%', 'Test Name'],
    ['John_ Doe!', 'John Doe'],
    ['Alice@ work', 'Alice Work'],
    ['marY jane', 'Mary Jane'],
    ['@hello$ world', 'Hello World'],
    ['char#acte$rs!', 'Characters'],
    ['Speci!al Ch@aracters#123', 'Special Characters123'],
    ['BoB! #123', 'Bob 123'],
    ['weird@123 _456', 'Weird123 456'],
    ['joHn_@ doE$', 'John Doe'],
  ])(
    'createFrom method should remove special characters and capitalize the words for input "%s"',
    (input: string, expected: string) => {
      sut = Name.createFrom(input);
      expect(sut.toValue()).toEqual(expected);
      expect(sut).toBeInstanceOf(Name);
    },
  );

  it('create method should return the name value correctly without changes', () => {
    sut = Name.create('test');
    expect(sut.toValue()).toEqual('test');
    expect(sut).toBeInstanceOf(Name);
  });
});
