export interface IAclService {
  can(value: string): Promise<void>;
  has(value: string): Promise<boolean>;
  forbiddenException(): void;
}

export const IAclService = Symbol('IAclService');
