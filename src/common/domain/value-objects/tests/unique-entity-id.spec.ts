import { UniqueEntityId } from '@/common/domain/value-objects/unique-entity-id';
import { UUID } from '@/utils/uuid';

describe('UniqueEntityId Value Object Unit Tests', () => {
  let sut: UniqueEntityId;

  it('toValue method', async () => {
    const uuid = UUID.generate();

    sut = UniqueEntityId.create(uuid);
    expect(sut.toValue()).toEqual(uuid);
  });

  it('create method should to instance new UniqueEntityId class', async () => {
    sut = UniqueEntityId.create();

    expect(sut).toBeInstanceOf(UniqueEntityId);
  });
});
