import { mapKeysToCamelCase } from '@/common/infra/utils/to-camel-case';

export abstract class Mapper<TOrmEntity, TDomainEntity, TProps> {
  protected abstract snakeCaseMapper: boolean;

  async from(ormEntity: TOrmEntity): Promise<TDomainEntity> {
    const data = this.snakeCaseMapper
      ? mapKeysToCamelCase(ormEntity)
      : ormEntity;

    return await this.toDomainEntity(data, (ormEntity as any).uuid);
  }

  async optional(ormEntity: TOrmEntity): Promise<TDomainEntity> | null {
    if (!ormEntity) {
      return null;
    }

    return await this.from(ormEntity);
  }

  async collection(ormEntities: TOrmEntity[]): Promise<TDomainEntity[]> {
    return Promise.all(ormEntities.map((entity) => this.from(entity)));
  }

  protected abstract toDomainEntity(
    props: TProps,
    uuid: string,
  ): Promise<TDomainEntity>;
}
