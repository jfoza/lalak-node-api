export type TPolicyMatch<T> = {
  has: boolean;
  action: () => Promise<T>;
};

export interface IPolicyAdapter {
  toValue(): string[];
  can(value: string): void;
  has(value: string): boolean;
  match<T>(expressions: TPolicyMatch<T>[]): Promise<T>;
}

export const IPolicyAdapter = Symbol('IPolicyAdapter');
