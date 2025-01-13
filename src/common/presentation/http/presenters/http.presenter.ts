export abstract class HttpPresenter<TEntity, THttp> {
  abstract from(entity: TEntity): THttp;

  optional(entity: TEntity | null): THttp | null {
    if (!entity) {
      return null;
    }
    return this.from(entity);
  }

  collection(entities: TEntity[]): THttp[] {
    if (entities.length === 0) {
      return [];
    }
    return entities.map((entity: TEntity): THttp => this.from(entity));
  }
}
