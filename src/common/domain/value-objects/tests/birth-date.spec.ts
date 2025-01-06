import { BirthDate } from '@/common/domain/value-objects/birth-date';
import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';

describe('BirthDate Value Object Unit Tests', () => {
  let sut: BirthDate;

  const datesDataBuilder = [
    { date: '1990-01-01', utc: Date.UTC(1990, 0, 1) },
    { date: '1991-02-02', utc: Date.UTC(1991, 1, 2) },
    { date: '1992-03-03', utc: Date.UTC(1992, 2, 3) },
    { date: '1993-04-04', utc: Date.UTC(1993, 3, 4) },
    { date: '1994-05-05', utc: Date.UTC(1994, 4, 5) },
    { date: '1995-06-06', utc: Date.UTC(1995, 5, 6) },
    { date: '1996-07-07', utc: Date.UTC(1996, 6, 7) },
    { date: '1997-08-08', utc: Date.UTC(1997, 7, 8) },
    { date: '1998-09-09', utc: Date.UTC(1998, 8, 9) },
    { date: '1999-10-10', utc: Date.UTC(1999, 9, 10) },
    { date: '2000-11-11', utc: Date.UTC(2000, 10, 11) },
    { date: '2001-12-12', utc: Date.UTC(2001, 11, 12) },
  ];

  it.each(datesDataBuilder)(
    'should return the original date object when toValue is called',
    ({ date }) => {
      const dateAux = new Date(date);

      sut = BirthDate.create(dateAux);
      expect(sut.toValue()).toEqual(dateAux);
    },
  );

  it.each(datesDataBuilder)(
    'should format date correctly with toString method',
    ({ date, utc }) => {
      const dateAux = new Date(utc);
      sut = BirthDate.create(dateAux);

      expect(sut.toString()).toBe(date);
    },
  );

  it('should correctly handle dates in different formats', () => {
    const date = new Date('2024-12-30T15:45:00Z');
    const birthDate = BirthDate.create(date);

    expect(birthDate.toString()).toBe('2024-12-30');
  });

  it('should createFrom a new instance of BirthDate class', () => {
    const date = new Date();

    sut = BirthDate.createFrom(date);
    expect(sut).toBeInstanceOf(BirthDate);
  });

  it('should create a new instance of BirthDate class', () => {
    const date = new Date();

    sut = BirthDate.create(date);
    expect(sut).toBeInstanceOf(BirthDate);
  });

  it('should throw an error for invalid date inputs', () => {
    expect(() => BirthDate.createFrom(null as unknown as Date)).toThrow(
      EntityValidationException,
    );
    expect(() => BirthDate.createFrom(undefined as unknown as Date)).toThrow(
      EntityValidationException,
    );
    expect(() => BirthDate.createFrom(new Date('invalid-date'))).toThrow(
      EntityValidationException,
    );
  });

  it('should handle timezones correctly', () => {
    const date = new Date('2024-12-30T00:00:00+02:00');
    const birthDate = BirthDate.create(date);

    expect(birthDate.toString()).toBe('2024-12-29');
  });
});
