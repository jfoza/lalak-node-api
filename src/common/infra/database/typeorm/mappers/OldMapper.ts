import { mapKeysToCamelCase } from '@/utils/to-camel-case';

export abstract class OldMapper<TModel, TDomainEntity, TProps> {
  protected snakeCaseMapper: boolean = false;

  async from(model: TModel): Promise<TDomainEntity> {
    const data = this.snakeCaseMapper ? mapKeysToCamelCase(model) : model;

    return await this.toDomainEntity(data, (model as any).uuid);
  }

  async optional(model: TModel): Promise<TDomainEntity> | null {
    if (!model) {
      return null;
    }

    return await this.from(model);
  }

  async collection(model: TModel[]): Promise<TDomainEntity[]> {
    return Promise.all(model.map((entity) => this.from(entity)));
  }

  protected abstract toDomainEntity(
    props: TProps,
    uuid: string,
  ): Promise<TDomainEntity>;
}
