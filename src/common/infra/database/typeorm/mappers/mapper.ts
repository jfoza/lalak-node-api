export abstract class Mapper<TOrmEntity, TDomainEntity> {
  abstract from(ormEntity: TOrmEntity): Promise<TDomainEntity>;

  async optional(ormEntity: TOrmEntity): Promise<TDomainEntity> | null {
    if (!ormEntity) {
      return null;
    }

    return await this.from(ormEntity);
  }

  async collection(ormEntities: TOrmEntity[]): Promise<TDomainEntity[]> {
    return Promise.all(ormEntities.map((entity) => this.from(entity)));
  }
}
