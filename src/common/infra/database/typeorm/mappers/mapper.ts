export abstract class Mapper<TRaw, TDomainEntity> {
  abstract from(raw: TRaw): Promise<TDomainEntity>;

  async optional(raw: TRaw | null): Promise<TDomainEntity | null> {
    if (!raw) {
      return null;
    }
    return this.from(raw);
  }

  async collection(raws: TRaw[]): Promise<TDomainEntity[]> {
    return Promise.all(raws.map((raw) => this.from(raw)));
  }
}
