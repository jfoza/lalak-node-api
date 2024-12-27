export interface IAclService {
  execute(): Promise<string[]>;
}

export const IAclService = Symbol('IAclService');
